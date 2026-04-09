interface RateLimitEntry {
    count: number
    resetAt: number
}

interface RateLimitConfig {
    windowMs: number
    maxRequests: number
}

interface RateLimitResult {
    allowed: boolean
    remaining: number
    retryAfterSeconds: number
}

const store = new Map<string, RateLimitEntry>()

function cleanupExpiredEntries(now: number) {
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt <= now) {
            store.delete(key)
        }
    }
}

export function consumeRateLimit(
    namespace: string,
    identifier: string,
    config: RateLimitConfig,
): RateLimitResult {
    const now = Date.now()
    cleanupExpiredEntries(now)

    const key = `${namespace}:${identifier}`
    const existingEntry = store.get(key)

    if (!existingEntry || existingEntry.resetAt <= now) {
        store.set(key, {
            count: 1,
            resetAt: now + config.windowMs,
        })

        return {
            allowed: true,
            remaining: Math.max(config.maxRequests - 1, 0),
            retryAfterSeconds: Math.ceil(config.windowMs / 1000),
        }
    }

    if (existingEntry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            retryAfterSeconds: Math.max(Math.ceil((existingEntry.resetAt - now) / 1000), 1),
        }
    }

    existingEntry.count += 1
    store.set(key, existingEntry)

    return {
        allowed: true,
        remaining: Math.max(config.maxRequests - existingEntry.count, 0),
        retryAfterSeconds: Math.max(Math.ceil((existingEntry.resetAt - now) / 1000), 1),
    }
}

export function clearRateLimit(namespace: string, identifier: string) {
    store.delete(`${namespace}:${identifier}`)
}
