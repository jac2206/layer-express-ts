import type { JwtPayload } from "../../security/interface/jwt-payload.interface";

export interface IAuthService {
  generateToken(payload: JwtPayload): string;
  verifyToken(token: string): JwtPayload;
}
