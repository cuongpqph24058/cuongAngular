import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const foodSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number,
  },
  des: {
    type: String,
  },
  imageUrl: {
    type: String
  },
  realPrice: {
    type: Number,
  },
  tags:{
    type: String,
  },
  origins:{
    type: String,
  },
  cookTime:{
    type: String,
  },
  stars:{
    type: String,
  },
  favorite: {
    type: Boolean,
  }
},{timestamps: true,versionKey: false})

foodSchema.plugin(mongoosePaginate)

export default mongoose.model("Food", foodSchema)