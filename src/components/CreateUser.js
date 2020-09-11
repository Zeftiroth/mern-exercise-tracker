import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateUser() {

    const [username, setUsername] = useState("");

    const handleUsernameChange = (e) => {
      
      setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/users/add`, {
            username: username
        }).then(response => {
            console.log(response.data)
        });
    }

    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
}

export default CreateUser
