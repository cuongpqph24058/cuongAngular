import Comment from '../models/comment';
import { commentSchema } from '../schemas/comment';

export const newComment = async (req, res) => {

  const {error} = commentSchema.validate(req.body,{abortEarly: false})
  if(error) {
    return res.status(400).json({
      message: error.details.map(err => err.message)
    })
  }

  try {
    const Commen = await Comment.create(req.body);
    return res.status(200).json({
      message: 'Thêm mới comment',
      Commen});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}


export const commentall = async (req, res) => {
  try {
    const commen = await Comment.find();
    return res.status(200).json({
      commen});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

// export const remove = async (req, res) => {
//   try {
//     const book = await Book.findOneAndDelete({_id: req.body.id});
//     return res.status(200).json({
//       message: "xóa thành công",
//       book});
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message
//     })
//   }
// }