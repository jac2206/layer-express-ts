import jwt from "jsonwebtoken";

import { env } from "../config/env";
import type { IAuthService } from "../services/interface/auth.service.interface";
import type { JwtPayload } from "./interface/jwt-payload.interface";

export class JwtAuthService implements IAuthService {
  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.jwtSecret, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, env.jwtSecret, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    if (decoded.type !== "access") {
      throw new Error("Invalid token type");
    }

    return decoded;
  }
}
