import { dbConnect } from 'utils/db'
import Book from 'models/Book'

dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {

    case 'GET':
      const books = await Book.find();
      res.status(200).json(books);

    case 'POST':
      try {
        const newBook = new Book(body)
        const savedBook = await newBook.save()
        return res.status(201).json(savedBook)
      } catch (error) {
        return res.status(500).json(error)
      }

    default:
      return res.status(400).json({ msg: 'this method is not supported'})
  }
}
