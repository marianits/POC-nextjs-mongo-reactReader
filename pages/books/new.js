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
    // PENDING RENAME
    const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
    const fileName = `image.${fileExt}`;

    try {
      const { data } = await axios.post(`/api/books/upload`, file, {
        headers: {
          'content-type': file.type,
          'x-filename': fileName,
        },
      });
      console.log(data);
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
