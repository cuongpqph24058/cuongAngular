import User from '../models/user';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const checkPermission = async (req, res,next) => {
  try {
   
if(!req.headers.authorization){
  return res.status(401).json({
    message: "bạn chưa đăng nhập"
  })
}

const token = req.headers.authorization.split(" ")[1]
const {id} = jwt.verify(token,"123456")

const user = await User.findById(id)
if(user.role !== "admin"){
  return res.status(401).json({
    message: "bạn không có quyền"
  })
}

req.user =user
next()

  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}