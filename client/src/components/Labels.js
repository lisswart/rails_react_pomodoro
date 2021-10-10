import { useState, useEffect } from 'react';
import { v4 as uuid} from 'uuid';

function Labels() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => r.json())
      .then((userObj) => {
        console.log(userObj.categories);
        const labelsSet = new Set();
        (userObj.categories).forEach(label => {
          if (label.category_label !== null) {
            labelsSet.add(label.category_label);
          }
        });
        setLabels(Array.from(labelsSet));
      })
  }, []);

  function handleDelete(id) {
    fetch(`/api/categories/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {          
          const updatedLabelList = labels.filter(label => label.id !== id);
          setLabels(updatedLabelList);
        }
      });      
  }

  function openEditForm(i) {
    document.querySelectorAll("div.label-edit-form")[i].style.display = "block";
  }

  function closeEditForm(i) {
    document.querySelectorAll("div.label-edit-form")[i].style.display = "none";
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left", backgroundColor: "rgb(78,78,78,0.1)", paddingTop: "1rem"}}>
      <button style={{marginLeft: "3rem"}}>Add Label</button>
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>Label</th>
            <th>Active</th>
          </tr>
          {
            labels && labels.map((label, i) => (
              <tr key={uuid()} >
                <td className="delete-cell">
                  <button onClick={() => handleDelete(label.id)}>delete</button>
                </td>
                <td className="cell-width">
                  <button className="edit-button" onClick={() => openEditForm(i)}>{label}</button>
                  <div className="form-popup label-edit-form">
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="category-label"></label>
                      <input 
                        type="text"
                        placeholder="enter a new category label"
                      />
                      <button type="submit" onClick={() => closeEditForm(i)}>save</button>
                    </form>
                  </div>
                </td>
                <td className="active-cell"><input type="checkbox" /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Labels
