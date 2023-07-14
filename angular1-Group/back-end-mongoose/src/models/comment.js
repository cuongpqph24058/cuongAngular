import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  content: {
    type: String,
  }
})


export default mongoose.model("Comment", commentSchema)