
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ExercisesList() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/`)
        .then(response => {
            if (response.data.length > 0)
            console.log(response)
            let tlist = response.data
            setList(tlist)
            console.log(list)
        })
        .catch(error => 
            {
                console.log(error)

            }
            )
        ;
    },[])
    let history = useHistory()
    const handleRedirect = (id) => {
        history.push(`/exercises/${id}`)
    }

    const handleDelete = (id) => {
        
        axios.delete(`http://localhost:5000/exercises/:${id}`)
        .then(response =>{
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });
    }

    return (
      <div>
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {list.map((exerlist) => {
                    return (
                      <tr key={exerlist._id}>
                        <td>{exerlist.username}</td>
                        <td>{exerlist.description}</td>
                        <td>{exerlist.duration}</td>
                        <td>{exerlist.date}</td>
                        <td>
                          <button onClick={handleRedirect}>Edit</button>
                          <button onClick={handleDelete}>Delete</button>
                        </td>
                      </tr>
                    );
                })}
                </tbody>
          </table>
          {/* {list.map((exerlist) => {
            return (
              
                <p>

                    {exerlist.username}
                </p>
                
            );
          })} */}
        </div>
      </div>
    );
}

export default ExercisesList
