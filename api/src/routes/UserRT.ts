import express from "express";
import { USER } from "../controllers/UserCTR.ts";
import { VAL } from "../middleware/Val.ts";
import { RSchema } from "../validation/Schema.ts";

// Routes:  localhost:9000/api/users
export const userRt: express.Router = express.Router();
    userRt.post("/users/register", VAL(RSchema), USER.Register);
    userRt.get("/users", USER.FetchAll);


