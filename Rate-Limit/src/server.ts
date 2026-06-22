import express from "express";
import cors from "cors";
import {
  fixedWindowLimiter,
  slidingWindowLimiter,
  tokenBucketLimiter,
} from "./rateLimit";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * IMPORTANT (for correct IP detection behind proxies)
 */
app.set("trust proxy", 1);

/**
 * Choose ONE limiter (switch as needed)
 */
app.use(fixedWindowLimiter);
// app.use(slidingWindowLimiter);
// app.use(tokenBucketLimiter);

/**
 * Test route
 */
app.get("/test", (req, res) => {
  res.json({
    message: "Success request",
    ip: req.ip,
  });
});

/**
 * GraphQL placeholder endpoint
 */
app.post("/graphql", (req, res) => {
  res.json({
    message: "GraphQL endpoint working",
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});