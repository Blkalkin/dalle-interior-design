const rateLimit = require('express-rate-limit');

// Rate limit middleware
const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: "You have exceeded your 15 requests per 15 minutes limit.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

module.exports = rateLimitMiddleware;