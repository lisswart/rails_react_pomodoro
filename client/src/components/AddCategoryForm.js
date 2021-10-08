import { useState, useEffect } from 'react';

function AddCategoryForm({ setCategory, setCategoryID }) {
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(userObj => {
        populateCategoriesList(userObj.categories)
      });
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({categoryLabel})
    }).then((r) => r.json())
      .then((category) => {
        console.log(category);
        setCategory(category.category_label);
        setCategoryID(category.id);
      });
  }

  function populateCategoriesList(userCategories) {
    const categoriesSet = new Set();
    userCategories.forEach(category => categoriesSet.add(category.category_label.toLowerCase().trim()));
    setCategoryArray(Array.from(categoriesSet));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryLabel" />
      <input list="category-list" 
        onChange={e => setCategoryLabel(e.target.value)}
        id="category_label"
        value={categoryLabel}
        placeholder="Please a choose a category AND PRESS ENTER..."
        className="task-input"
      />
      <datalist id="category-list">
        {
          categoryArray.map((category, i) => (
              <option key={i}
                value={category}
                onChange={e => setCategoryLabel(e.target.value)}
              />
            ))
        }
      </datalist>
    </form>
  );
}

export default AddCategoryForm;
