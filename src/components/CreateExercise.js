import React,{ useEffect, useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


function CreateExercise() {

    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [date, setDate] = useState(new Date())
    const [exerlist, setExerlist] = useState([])
    

    useEffect(() => {
        axios.get(`http://localhost:5000/users/`)
        .then(response =>{
            console.log(response)
            const tempList = response.data
            setExerlist(tempList)
        });
    },[])


    const handleUsernameChange = (e) => {
        if (username !== "-- select an option --"  )
        setUsername(e.target.value)

    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    }

    const handleDateChange = (date) => {
        
        setDate(date)
    }

    // const exercise = {
    // username: username,
    // description: description,
    // duration: duration,
    // date: date,
    // };

    let history = useHistory()
    const handleSubmit = (e) => {
        
        e.preventDefault()
        axios
        .post(`http://localhost:5000/exercises/add`, {
            username: username,
            description: description,
            duration: duration,
            date: date,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });

        history.push('/')
    }
    
    
return (
  <div>
    <h3>Create New Exercise Log</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username: </label>
        <select
          required
          className="form-control"
          value={username}
          onChange={handleUsernameChange}
        >
          <option selected value>
            
            -- select an option --
          </option>
          {exerlist.map((user) => {
            return (
              <option  key={user.username} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label>Description: </label>
        <input
          type="text"
          required
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="form-group">
        <label>Duration (in minutes): </label>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={handleDurationChange}
        />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <div>
          <DatePicker 
          selected={date} 
        //   value={date}
          onChange={handleDateChange} />
        </div>
      </div>

      <div className="form-group">
        <input
          type="submit"
          value="Create Exercise Log"
          className="btn btn-primary"
        />
      </div>
    </form>
  </div>
);
}

export default CreateExercise