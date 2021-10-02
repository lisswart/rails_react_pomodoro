import { useState } from 'react';

function AddCategoryForm({ setCategory }) {
  const [categoryLabel, setCategoryLabel] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({categoryLabel})
    }).then((r) => r.json())
      .then((category) => setCategory(category.category_label));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryLabel" />
      <input type="text" 
        onChange={e => setCategoryLabel(e.target.value)}
        id="category_label"
        value={categoryLabel}
        placeholder="category label..."
        className="task-input"
      />
    </form>
  );
}

export default AddCategoryForm;
