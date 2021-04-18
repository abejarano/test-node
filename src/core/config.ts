import * as dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({path: ".env"});
} else {
    dotenv.config({path: ".env.example"});
}
const CONFIG = {
    DEV: Boolean(process.env.DEV),
    SERVER_PORT: process.env.SERVER_PORT,
};

export default CONFIG;
