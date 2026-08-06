const TIME_FRAME = 60_000
const MAX_REQS = 5

const requestLog = new Map<string, number[]>();

export function isRateLimited(ip:string): boolean {
    const currentTime = Date.now();
    const timeStamps = (requestLog.get(ip) ?? []).filter(
        (t) => currentTime - t < TIME_FRAME
    );

    if (timeStamps.length >= MAX_REQS) {
        requestLog.set(ip, timeStamps);
        return true;
    }

    timeStamps.push(currentTime);
    requestLog.set(ip, timeStamps);
    return false;
}

export function getClientIp(req: {
    headers: Record<string, string | string[] | undefined>;
    socket?: {remoteAddress?: string};
}): string {
    const forwarded = req.headers['x-forwarded-for'];
    const forwardedIp = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return forwardedIp?.split(',')[0]?.trim() ?? req.socket?.remoteAddress ?? 'unknown';
}