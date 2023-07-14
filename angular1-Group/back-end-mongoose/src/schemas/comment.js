import joi from 'joi'

export const commentSchema = joi.object({
  name: joi.string().required(),
  content: joi.string().required(),
})
