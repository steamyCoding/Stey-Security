/**
 * Fixed-window, in-memory rate limiter.
 * Works per server instance only. For multi-instance production deployments,
 * back this with a shared store (for example Redis) or enforce limits at the edge.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function resetRateLimitForTests(): void {
  buckets.clear();
}
