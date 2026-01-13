import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: JwtPayload | any;
    }
  }
}