import { Request } from "express";

export function getUserIP(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0];
  }

  return req.ip as string;
}