/**
 * @description This is boot file
 *
 */
import http, { Server } from 'http';

import { app,PORT  } from './app';

const httpServer: Server = http.createServer(app);
const server = httpServer.listen(PORT, () => {
    console.log("server up and running on :", PORT);
});

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1)
})