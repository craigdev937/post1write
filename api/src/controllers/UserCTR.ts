import express from "express";
import bcrypt from "bcryptjs";
import { dBase } from "../data/Database.ts";
import { signToken } from "../middleware/Auth.ts";
import { RSchema, LSchema } from "../validation/Schema.ts";
import type { RType, LType } from "../validation/Schema.ts";
import type { IReg } from "../models/Interfaces.ts";

class UserClass {
    Register: express.Handler = async (req, res, next) => {
        try {
            const R = RSchema.parse(req.body);
            const eQRY = "SELECT email FROM users WHERE email=$1";
            const userExists = await dBase.query<RType>(eQRY, [R.email]);
            if (userExists.rows.length > 0) {
                return res.status(401)
                    .json({msg: "User Already Exists!"});
            };
            const bPASS = await bcrypt.hash(R.password, 10);
            const QRY = `INSERT INTO users 
                (username, email, password) 
                VALUES ($1, $2, $3) RETURNING *`;
            const values = [R.username, R.email, bPASS];
            const newUser = await dBase.query<IReg>(QRY, values);
            const newToken = signToken(newUser.rows[0].id);
            res.cookie("token", newToken, {
                httpOnly: true,
                secure: false,  //  Set to true for Production.
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30  // 30-Days.
            });
            return res
                .status(201)
                .json({
                    success: true,
                    message: "User has Registered!",
                    data: {
                        user: newUser.rows[0],
                        token: newToken
                    }
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Registering the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = "SELECT * FROM users ORDER BY id ASC";
            const users = await dBase.query<IReg[]>(QRY);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "All Registered Users!",
                    count: users.rows.length,
                    data: users.rows
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error fetching all the Users.",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    Login: express.Handler = async (req, res, next) => {
        try {
            const L = LSchema.parse(req.body);
            const QRY = "SELECT * FROM users WHERE email=$1";
            const user = await dBase.query<IReg>(QRY, [L.email]);
            if (user.rows.length === 0) {
                return res
                    .status(400)
                    .json({msg: "Invalid Credentials!"});
            };

            const uData = user.rows[0];
            const isMatch = await bcrypt.compare(
                L.password, uData.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({msg: "Invalid Credentials!"});
            };

            const logToken = signToken(uData.id);
            res.cookie("token", logToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30  //  30-Days.
            });            
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The User has Logged In!",
                    data: {
                        id: uData.id,
                        username: uData.username,
                        email: uData.email,
                        createdAt: uData.created_at,
                        updatedAt: uData.updated_at
                    },
                    token: logToken
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Loggin in the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };
};

export const USER: UserClass = new UserClass();



