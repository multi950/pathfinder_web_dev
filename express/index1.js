/**Code belonging to Michael roos
 * A sample Express server.
 */
"use strict";

const port    = process.env.DBWEBB_PORT || 1337;
const express = require("express");
var path = require('path');
const app     = express();
const routeIndex = require("./route/index1.js");
const middleware = require("./middleware/index.js");

app.use(middleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname,  "../web/css/")));
app.use(express.static(path.join(__dirname, "../web/html/")));
app.use("/", routeIndex);
app.listen(port, logStartUpDetailsToConsole)


/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    let routes = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
