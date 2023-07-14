import Food from '../models/food';
import { foodSchema } from '../schemas/food';
import paginate from 'mongoose-paginate-v2'

export const create = async (req, res) => {

  const {error} = foodSchema.validate(req.body,{abortEarly: false})
  if(error) {
    return res.status(400).json({
      message: error.details.map(err => err.message)
    })
  }

  try {
    const food = await Food.create(req.body);
    return res.status(200).json({
      message: 'Food created successfully',
      food});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const update = async (req, res) => {
  const {error} =foodSchema.validate(req.body,{abortEarly: false})
  if(error) {
    return res.status(400).json({
      message: error.details.map(err => err.message)
    })
  }

  try {
    const food = await Food.findOneAndUpdate(req.body.id,req.body,{new:true});
    return res.status(200).json({
      message: 'food update successfully',
      food});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const getAll = async (req, res) => {

  const {
    _page= 1,_limit= 20,_sort= "createAC", _order = "asc"
  } = req.query

  const options = {
    page: _page,
    limit: _limit,
    sort: {[_sort]: _order === "desc" ? -1 : 1}
  }

  try {
    const food = await Food.paginate({},options);
    return res.status(200).json({
      food});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const get = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    return res.status(200).json({
      food});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const remove = async (req, res) => {
  try {
    const food = await Food.findOneAndDelete({_id: req.params.id});
    return res.status(200).json({
      message: "xóa thành công",
      food});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}