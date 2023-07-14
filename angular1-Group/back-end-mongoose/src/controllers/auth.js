import User from '../models/user';
import { signinSchema,signupSchema } from '../schemas/user';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      user});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({_id: req.params.id});
    return res.status(200).json({
      message: "xóa thành công",
      user});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const removeUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({_id: req.params.id});
    return res.status(200).json({
      message: "xóa thành công",
      user});
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const users = async (req, res) => {
  try {
    const user = await User.find()
    return res.status(201).json({
      user
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const signup = async (req, res) => {

  const {error} = signupSchema.validate(req.body,{abortEarly: false})
  if(error) {
    return res.status(400).json({
      message: error.details.map(err => err.message)
    })
  }

  try {
   
    const userExist = await User.findOne({_id:req.body.id})
    if(userExist) {
      return res.status(400).json({
        message: "tài khoản đã tồn tại"
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.password,10)
    
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    const token = jwt.sign({id: user._id},"123456",{expiresIn: "1d"})
    user.password = undefined

    return res.status(201).json({
      message: "tại tài khoản thành công",
      accessToken: token,
      user
    })

  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const signin = async (req, res) => {

  const {error} = signinSchema.validate(req.body,{abortEarly: false})
  if(error) {
    return res.status(401).json({
      message: error.details.map(err => err.message)
    })
  }

  try {
      
    const user = await User.findOne({email:req.body.email})
    if(!user) {
      return res.status(400).json({
        message: "tài khoản không tồn tại"
      })
    }

    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isMatch) {
      return res.status(401).json({
        message: "mật khẩu không đúng"
      })
    }
    
    const token = jwt.sign({id: user._id},"123456",{expiresIn: "1d"})
    user.password = undefined

    return res.status(201).json({
      message: "đăng nhập thành công",
      accessToken: token,
      user
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}