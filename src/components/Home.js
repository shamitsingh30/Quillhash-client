import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './Users';
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom';

function Home(){
    var [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            return navigate('/users/sign-in');
        }
        axios({
            method: "get",
            url: "http://localhost:8000/api",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((data) => {
            setUsers(data.data.users);
            console.log(data);
        })
        .catch(err => {
            navigate('/users/sign-in')
        });

    }, []);
    
    return(
        
        <div>
            <h2 className='mt-4'>All</h2>
            <div className='col d-flex flex-wrap justify-content-center'>
                { 
                    users.map((user) => <User user={user} key={user._id}></User>)
                }
            </div>
        </div>
    )
}

export default Home;
