import type { VercelRequest, VercelResponse } from '@vercel/node';
// The `.js` extensions are required, not optional: package.json sets
// "type": "module", so these run as ESM on Vercel, and Node's ESM loader does
// not resolve extensionless relative paths. It's `.js` even though the source
// is `.ts` — the extension refers to the emitted file.
import { isRateLimited, getClientIp } from './_helpers/rateLimiter.js';
import type { ContactFormBody, ResendAttachment } from './_helpers/types.js';

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical ceiling

const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024; // 3 MB
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  const body = req.body as ContactFormBody;
  const { name, email, subject, message, website, attachment } = body ?? {};

  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Name is too long.' });
  }

  if (
    !email ||
    typeof email !== 'string' ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  // Subject is optional, but if it is sent it still has to be a sane string —
  // it ends up in the email's Subject header.
  if (subject !== undefined) {
    if (typeof subject !== 'string') {
      return res.status(400).json({ error: 'Subject is invalid.' });
    }
    if (subject.length > MAX_SUBJECT_LENGTH) {
      return res.status(400).json({ error: 'Subject is too long.' });
    }
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  let resendAttachment: ResendAttachment[] | undefined;

  if (attachment) {
    // typeof checks, not just truthiness: the declared types describe what a
    // well-behaved client sends, but this is untrusted input and nothing
    // enforces them at runtime. A non-string `base64` (an array, say) has a
    // .length of its own, which would sail straight past the size check below.
    if (
      typeof attachment !== 'object' ||
      typeof attachment.filename !== 'string' ||
      typeof attachment.type !== 'string' ||
      typeof attachment.base64 !== 'string' ||
      !attachment.filename ||
      !attachment.type ||
      !attachment.base64
    ) {
      return res.status(400).json({ error: 'Attachment is malformed.' });
    }

    if (!ALLOWED_ATTACHMENT_TYPES.has(attachment.type)) {
      return res.status(400).json({ error: 'Attachment type not allowed.' });
    }

    const approxDecodedBytes = Math.floor((attachment.base64.length * 3) / 4);
    if (approxDecodedBytes > MAX_ATTACHMENT_BYTES) {
      return res.status(400).json({ error: 'Attachment is too large (max 3 MB).' });
    }

    resendAttachment = [
      {
        filename: attachment.filename,
        content: attachment.base64,
      },
    ];
  }

  //RESEND STUFF
  
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Missing required environment variables for contact form.');
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email.trim(),
        subject: subject?.trim()
          ? `Portfolio: ${subject.trim()}`
          : `New portfolio message from ${name.trim()}`,
        text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
        attachments: resendAttachment,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errBody);
      return res.status(502).json({ error: 'Failed to send message. Please try again later.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error sending contact form email:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}