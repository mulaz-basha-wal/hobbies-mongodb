import "./App.css";
import axios from "axios";
import Hobby from "./Hobby";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [hobbies, setHobbies] = useState([]);
  const loadHobbies = () => {
    axios.get("/hobbies").then((res) => {
      setHobbies(res.data);
    });
  };

  useEffect(() => {
    loadHobbies();
  }, []);
  const addHobby = (e) => {
    e.preventDefault();
    let hobbyItem = e.target;
    const d = new Date(e.target.doc.value);
    const doC = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    console.log(doC);
    const hobby = {
      name: hobbyItem.name.value,
      doc: doC,
      desc: hobbyItem.desc.value,
    };
    console.log(hobby);
    axios
      .post("/hobbies", hobby)
      .then((response) => {
        console.log(response);
        loadHobbies();
      })
      .catch((error) => {
        alert(`Error occured while adding forum: ${error}`);
      });
  };
  const deleteHobby = (id) => {
    axios
      .get(`/${id}`)
      .then((res) => {
        loadHobbies();
      })
      .catch((error) => alert("error occured"));
  };
  return (
    <div className='App'>
      <div className='form-container'>
        <form onSubmit={addHobby} noValidate>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Name'
            />
          </div>
          <div className='form-group'>
            <input type='date' name='doc' className='form-control' />
          </div>
          <div className='form-group'>
            <textarea
              name='desc'
              className='form-control'
              placeholder='Hobby Description'
            />
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <input
              type='submit'
              className='btn btn-success'
              value='Add Hobby'
            />
          </div>
        </form>
      </div>
      <div className='d-flex flex-row justify-content-center'>
        {hobbies.map((hobby) => {
          console.log(hobby);
          return <Hobby hobby={hobby} delete={deleteHobby} />;
        })}
      </div>
    </div>
  );
}

export default App;
