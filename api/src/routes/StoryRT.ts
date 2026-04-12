import express from "express";
import { STORY } from "../controllers/StoryCTR.ts";
import { PRO } from "../middleware/Auth.ts";
import { VAL } from "../middleware/Val.ts";
import { SSchema } from "../validation/Schema.ts";

// ROUTES  http://localhost:9000/api/story
export const storyRt: express.Router = express.Router();
    storyRt.post("/story", PRO, VAL(SSchema), STORY.Create);
    storyRt.get("/story", STORY.FetchAll);
    storyRt.get("/story/:id", STORY.GetOne);



