import "reflect-metadata";
import { createConnection } from "typeorm";
import { ServerApplication } from "./core/server";
import { Controllers } from "./core/controllers";

createConnection().then(async connection => {

    new ServerApplication().run();
    for (let controller of Controllers) {
        new controller;
    }

}).catch(error => console.log(error));
