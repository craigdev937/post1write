import "dotenv/config";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import logger from "morgan";
import multer from "multer";
import cookieParser from "cookie-parser";
import { ERR } from "./middleware/midError.ts";
import { userRt } from "./routes/UserRT.ts";
import { storyRt } from "./routes/StoryRT.ts";

const app: express.Application = express();
app.use(helmet());

// CORS Setup.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, DELETE");
        return res
            .status(res.statusCode)
            .json({ "status message": "OK" });
    };
    next();
});

// Multer Configuration.
const UPLOADS_DIR = "uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${
            Date.now()}-${Math.round(Math.random() * 1e9)
        }`;
        const ext = file.originalname.split(".").pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
});

const fileFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const ALLOWED_MIME_TYPES = [
        "image/svg",
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
    ];
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Unsupported file type: ${file.mimetype}`));
    };
};

export const UP = multer({
    storage, fileFilter, limits: {
        fileSize: 5 * 1024 * 1024,  // 5 MB.
    },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use("/api", userRt);
app.use("/api", storyRt);
app.use(ERR.notFound);
app.use(ERR.errHandler);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server: 🌐 http://localhost:${port}`);
    console.log("Press CTRL + C to Exit!");
});



