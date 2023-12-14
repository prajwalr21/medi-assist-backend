"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = require("./middleware/cors");
var getAnswerHandler_1 = require("./handlers/getAnswerHandler");
var classifier_1 = require("./handlers/classifier");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_1.cors);
app.post('/getAnswer', classifier_1.classifier, getAnswerHandler_1.getAnswerHandler);
app.listen(4000, function () {
    console.log('listening on 4000');
});
//# sourceMappingURL=server.js.map