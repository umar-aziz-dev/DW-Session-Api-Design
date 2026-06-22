import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "./redis";
import { getUserIP } from "./ip";
import { Request ,Response, NextFunction} from "express";
/**
 * 1. FIXED WINDOW
 */
export const fixedLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "fixed",
  points: 10,      // 10 requests
  duration: 60,    // per 60 seconds
});

/**
 * 2. SLIDING WINDOW (more smooth)
 */
export const slidingLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "sliding",
  points: 10,
  duration: 60,
  execEvenly: true,
});

/**
 * 3. TOKEN BUCKET (burst-friendly)
 */
export const tokenLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "bucket",
  points: 20,   // capacity
  duration: 60, // refill time window
});

/**
 * Middleware factory (reusable)
 */
function createMiddleware(limiter: RateLimiterRedis, label: string) {
  return async (req:Request, res:Response, next:NextFunction) => {
    try {
      const ip = getUserIP(req);

      await limiter.consume(ip);

      next();
    } catch (err) {
      res.status(429).json({
        message: `Too many requests (${label})`,
      });
    }
  };
}

/**
 * Export ready-to-use middlewares
 */
export const fixedWindowLimiter = createMiddleware(fixedLimiter, "fixed window");

export const slidingWindowLimiter = createMiddleware(slidingLimiter, "sliding window");
export const tokenBucketLimiter = createMiddleware(tokenLimiter, "token bucket");
