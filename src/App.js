import React, {useState, useEffect} from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const App = () =>{
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

const handleSubmit = (e) => {
  e.preventDefault();
  if(!name) {
    showAlert(true, "danger", "Enter value");

  }else if(name && isEditing) {
    setList(
      list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item
      })
    );
    setName("");
    setEditID(null);
    setIsEditing(false);
    showAlert(true, "success", "value changes");
  } else {
    showAlert(true, "success", "Item Added to the list" );
    const newItem = {id: new Date().getTime().toString(), title: name};
    setList([...list, newItem]);
    setName("");
  }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
};

const removeItem = (id) => {
  showAlert(true, "danger", "Item Removed");
  setList(list.filter((item) => item.id !== id));
};
const editItem = (id) => {
  const editItem = list.find((item) => item.id === id);
  setIsEditing(true);
  setEditID(id);
  setName(editItem.title);
};
const clearList = () => {
  showAlert(true, "danger", "Empty List");
  setList([]);
};


  return(
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}  list={list}/>}
        <h3 style={{marginBottom: "1.5rem", textAlign: "center"}}>Todo app</h3>
        <div className="mb-3 form">
          <input type="text" className="form=control"
          placeholder="e.g. bread"
          onChange={(e) => setName(e.target.value)}
          value={name} />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "Submit"}
          </button>
          </div> 
      </form>
      {list.length > 0 && (
        <div style={{marginTop: "2rem"}}>
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <div className="text-center">
            <button className="btn btn-warning" onClick={clearList}>clear Items</button>
          </div>
        </div>
      )}
    </section>
  );
};


export default App;
