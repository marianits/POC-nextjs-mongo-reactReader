import { Schema, model, models } from 'mongoose'

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  URL: {
    type: String,
    required: [true, 'URL is required'],
    trim: true
  } 
}, {
  timestamps: true,
  versionKey: false
})

export default models.Book || model('Book', bookSchema)
