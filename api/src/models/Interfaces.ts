import express from "express";

export interface JwtPayload {
    id: number,
    email: string
};

export interface AUTH extends express.Request {
    user?: JwtPayload
};

export interface IReg {
    id: number,
    username: string,
    email: string,
    password: string,
    created_at?: string,
    updated_at?: string
};



