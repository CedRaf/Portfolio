export interface ContactFormAttachment {
    filename: string;
    type: string;
    base64: string;
}

export interface ContactFormBody {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string; //honeypot, should always be empty
    attachment?: ContactFormAttachment;
}

export interface ResendAttachment {
    filename: string;
    content: string;
}