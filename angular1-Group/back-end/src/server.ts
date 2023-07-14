import express from "express";
import cors from "cors";
import { foods, Tags } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

app.get("/api/foods", (req,res)=>{
    res.send(foods);
})
app.get("/api/foods/search/:searchTerm", (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const food = foods
    .filter(food=> food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
    res.send(food)
})
app.get("/api/foods/tags", (req,res)=>{
    res.send(Tags)
})
app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const food = foods
    .filter(food => food.tags?.includes(tagName));
    res.send(food);
  })
  app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = foods
    .find(food => food.id == foodId);
    res.send(food);
  })
const port = 8080;
app.listen(port,() =>{
    console.log("website served on http://localhost:" + port);
})