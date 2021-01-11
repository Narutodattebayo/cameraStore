

import { CONFIG } from "./common";
import App from "./app";

// create server and start listening on port
let server = App.instance.listen(CONFIG.APP_PORT);



// add server listener
server.on('listening', function () {
    console.log(`Server started listening on port ${CONFIG.APP_PORT}`);
});