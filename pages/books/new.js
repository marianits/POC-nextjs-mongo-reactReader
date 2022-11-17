import axios from 'axios';
import { useState } from 'react';

export default function NewBook() {

  const [file, setFile] = useState();
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const upload = async () => {
    console.log(file);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('title', title);

    try {
      await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        body: formData
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <label>Titulo:</label>
      <input
        type="text"
        id="title"
        name="bookTitle"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>File:</label>
      <input
        type="file"
        id="my-image-id"
        name="my-image-id"
        onChange={handleFileChange}
      />
      <button onClick={upload}>Submit</button>
    </div>
  );
}
