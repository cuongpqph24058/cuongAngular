"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("../data");
var router = (0, express_1.Router)();
router.get("/api/foods", function (req, res) {
    res.send(data_1.foods);
});
router.get("/api/foods/search/:searchTerm", function (req, res) {
    var searchTerm = req.params.searchTerm;
    var food = data_1.foods.filter(function (food) { return food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()); });
    res.send(food);
});
router.get("/api/foods/tags", function (req, res) {
    res.send(data_1.Tags);
});
