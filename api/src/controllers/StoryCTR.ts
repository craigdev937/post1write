import express from "express";
import { dBase } from "../data/Database.ts";
import { SSchema } from "../validation/Schema.ts";
import type { IStory } from "../models/Interfaces.ts";
import type { SType } from "../validation/Schema.ts";

class StoryClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const S = SSchema.parse(req.body);
            const QRY = `INSERT INTO story 
            (author_id, title, text) 
            VALUES ($1, $2, $3) RETURNING*`;
            const values = [S.author_id, S.title, S.text];
            const newStory = await dBase.query<SType>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The Story was Created!",
                    data: newStory.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Creating the Story!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = "SELECT * FROM story ORDER BY id ASC";
            const stories = await dBase.query<IStory[]>(QRY);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "All Stories!",
                    count: stories.rows.length,
                    data: stories.rows
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error fetching all Stories!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const QRY = "SELECT * FROM story WHERE id=$1";
            const values = [id];
            const story = await dBase.query<IStory>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "One Story!",
                    data: story.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error getting one Story!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const S = SSchema.parse(req.body);
            const { id } = req.params;
            const QRY = `UPDATE story 
            SET author_id = $1, title = $2, text = $3, 
            updated_at = CURRENT_TIMESTAMP
            WHERE id=$4 RETURNING *`;
            const values = [S.author_id, S.title, S.text, id];
            const story = await dBase.query<IStory>(QRY, values);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The Story was Updated!",
                    data: story.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Updating a Story!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };
};

export const STORY: StoryClass = new StoryClass();



