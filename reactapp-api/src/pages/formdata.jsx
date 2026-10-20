import { useState } from "react";

function Formdata({ onAddMovie }) {
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    year: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddMovie({
      Title: form.title,
      Poster: form.imageUrl,
      Year: form.year,
      Plot: form.description,
    });
    setForm({ title: "", imageUrl: "", year: "", description: "" });
  }

  return (
    <form className="formdata" onSubmit={handleSubmit}>
      <h2>Add a movie</h2>
      <input
        name="title"
        placeholder="Movie name"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        type="url"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        required
      />
      <input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <button type="submit">Add movie</button>
    </form>
  );
}

export default Formdata;
