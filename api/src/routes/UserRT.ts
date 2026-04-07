import express from "express";
import { USER } from "../controllers/UserCTR.ts";
import { PRO } from "../middleware/Auth.ts";
import { VAL } from "../middleware/Val.ts";
import { RSchema, LSchema } from "../validation/Schema.ts";

// Routes:  localhost:9000/api/users
export const userRt: express.Router = express.Router();
    userRt.post("/users/register", VAL(RSchema), USER.Register);
    userRt.post("/users/login", VAL(LSchema), USER.Login);
    userRt.post("/users/logout", USER.Logout);
    userRt.get("/users", USER.FetchAll);
    userRt.get("/users/me", PRO, USER.Me);


