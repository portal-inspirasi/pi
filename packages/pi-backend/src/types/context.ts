import { Request } from "express";

export interface SharedContext {
  req: Request;
}
