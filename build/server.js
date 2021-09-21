"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = __importDefault(require("./database"));
var mythical_wolrd_1 = require("./models/mythical-wolrd");
var app = (0, express_1.default)();
var address = "http://localhost:3000";
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    database_1.default.query("SELECT * FROM books", function (err, result) {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log("Something went wrong " + err);
        }
        ;
    });
    database_1.default.end;
});
database_1.default.connect;
app.get('/users', function (req, res) {
    res.send(mythical_wolrd_1.MythicalWorldStore);
});
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports.default = app;
