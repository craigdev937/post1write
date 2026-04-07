export interface JwtPayload {
    id: number,
    email: string
};

export interface IReg {
    id: number,
    username: string,
    email: string,
    password: string,
    created_at?: string,
    updated_at?: string
};

export interface ILog {
    id: number,
    email: string,
    password: string
};



