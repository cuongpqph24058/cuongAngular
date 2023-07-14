import express from 'express';
import {get,getAll,create,update,remove} from '../controllers/food'
import { checkPermission } from '../middlewares/checkPermission';
import {foods, Tags} from "../../db.json"
import asyncHandler from 'express-async-handler';
const router = express.Router()

router.get("/foods",getAll)
router.post("/foods",create)
router.get("/api/foods/:id",get)
router.put("/foods/:id",checkPermission,update)
router.delete("/foods/:id",remove)
router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const foods = await FoodModel.find({name: {$regex:searchRegex}})
      res.send(foods);
    }
  ))
  router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await FoodModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await FoodModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  
  router.get("/tag/:tagName",asyncHandler(
    async (req, res) => {
      const foods = await FoodModel.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))
  
  router.get("/:foodId", asyncHandler(
    async (req, res) => {
      const food = await FoodModel.findById(req.params.foodId);
      res.send(food);
    }
  ))
router.get("/foods/tags", (req,res)=>{
    res.send(Tags)
})
export default router