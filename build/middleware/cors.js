"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
var cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    console.log('Cors done  ');
    next();
};
exports.cors = cors;
//# sourceMappingURL=cors.js.map