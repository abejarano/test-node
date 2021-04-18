import { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import CONFIG from "./config";
import { container } from "inversify-props";

export class ServerApplication {
    private app: Application;

    constructor() {
        this.build();
    }

    private build(): void {
        let server: InversifyExpressServer = new InversifyExpressServer(container);
        server.setConfig(app => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));

            app.use(cors({
                "origin": "*",
                "methods": "GET, HEAD, PUT, POST, DELETE",
                "preflightContinue": false,
                "optionsSuccessStatus": 204
            }));

            app.set("port", CONFIG.SERVER_PORT);
        });

        this.app = server.build();
    }

    public run() {
        this.app.listen(this.app.get("port"), () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                this.app.get("port"),
                this.app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
