const UtilsChecking = require("../checking");

let RespHandler = {
    WithNote: function (res, httpCode, resCode, note) {
        res.status(httpCode);
        res.json({ code: resCode, note: note });
    },
    WithData: function (res, httpCode, resCode, data) {
        if (UtilsChecking.IsEmpty(data)) {
            data = []
        }
        res.status(httpCode);
        res.json({ code: resCode, data: data });
    }
}

module["exports"] = RespHandler;