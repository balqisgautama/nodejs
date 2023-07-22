const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const ConstGeneral = require('../constanta/general');
const RespHandler = require('../utils/handler/response');
const RespCode = require('../constanta/response_code');
const UserRouter = require('../router/router_user');
const JWTRouter = require('../router/router_jwt');

let MainRouter = {
    init: function () {
        let PORT = ConstGeneral.PORT;

        app.set('port', PORT);
        app.use(cors());
        app.use(bodyParser.json());


        app.get("/status", (req, res) => {
            RespHandler.WithNote(res, ConstGeneral.HTTP_CODE.OK, RespCode.OK, "Server Listening on PORT: "+ PORT)
        });


        app.use('/user', UserRouter);
        app.use('/jwt', JWTRouter);


        app.listen(PORT, () => {
            console.log("Server Listening on PORT:", PORT);
        });
    }
}
module["exports"] = MainRouter;