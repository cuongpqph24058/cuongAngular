import {Router} from 'express';
import { Jwt } from "jsonwebtoken";
import { Tags, foods } from '../data';

const router = Router();
router.get("/api/foods", (req, res)=>{
    res.send(foods);
})
router.get("/api/foods/search/:searchTerm", (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const food = foods.filter(food=> food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(food)
})
router.get("/api/foods/tags", (req,res)=>{
    res.send(Tags)
})
