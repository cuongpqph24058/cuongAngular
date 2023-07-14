"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var data_1 = require("./data");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.get("/api/foods", function (req, res) {
    res.send(data_1.foods);
});
app.get("/api/foods/search/:searchTerm", function (req, res) {
    var searchTerm = req.params.searchTerm;
    var food = data_1.foods.filter(function (food) { return food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()); });
    res.send(food);
});
app.get("/api/foods/tags", function (req, res) {
    res.send(data_1.Tags);
});
var port = 8080;
app.listen(port, function () {
    console.log("website served on http://localhost:" + port);
});
