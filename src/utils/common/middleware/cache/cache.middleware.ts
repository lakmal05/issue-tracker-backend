import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    if (req.method === "GET") {
      const cacheKey = req.originalUrl;
    }
    next();
  }
}
