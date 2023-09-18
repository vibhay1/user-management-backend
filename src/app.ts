import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import sequelize from './model/sequelize';
const app: Express = express();
dotenv.config();

if (!process.env.PORT) {
    console.log("Env port not found Shutting down server ...");
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
        await sequelize.sync();
        // await sequelize.sync({ force: true });// only drop re-initialize
        // await sequelize.sync({ alter: true });// only alter 

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1)
    }
}
main();

import userController from "./controller";

app.use('/user', userController);

app.use('*', (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        code: 404,
        message: "Request not valid or not found!!"
    })
});

export { app, PORT };

