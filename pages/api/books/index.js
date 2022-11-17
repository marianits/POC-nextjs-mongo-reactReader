import { dbConnect } from 'utils/db'
import Book from 'models/Book'
import axios from "axios"
import formidable from "formidable"
import fs from "fs";

dbConnect()

export const config = {
  api: {
    bodyParser: false
  }
}

const uploadImage = async (file, title) => {
  const data = fs.readFileSync(file.path);
  const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
  const fileName = `${title}.${fileExt}`
  const { data: { url } } = await axios.post(`http://localhost:3000/api/books/upload`, data, {
    headers: {
      'content-type': file.type,
      'x-filename': fileName
    }
  });
  return url;
}

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {

    case 'GET':
      const books = await Book.find();
      res.status(200).json(books);
      break;
    case 'POST':
      try {
        const form = new formidable.IncomingForm();
        await form.parse(req, async (err, fields, files) => {
          const url = await uploadImage(files.file, fields.title);
          const newBook = new Book({
            title: fields.title,
            URL: url
          });
          await newBook.save();
        });
        res.status(201).json();
      } catch (error) {
        return res.status(500).json(error)
      }

    default:
      return res.status(400).json({ msg: 'this method is not supporteddd'})
  }
}
