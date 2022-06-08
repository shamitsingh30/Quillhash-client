import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './Users';
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'

function Home(){
    var [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            return navigate('/users/sign-in');
        }

        setSocket(io("http://localhost:5000"));

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

    useEffect(() => {
        socket?.on("getNotification", (data)=>{
            console.log(data);
        })
    },[socket])

    useEffect(() => {
        socket?.emit("newUser", localStorage.getItem('id'));
    }, [socket, localStorage.getItem('id')]);
    
    return(
        
        <div>
            <h2 className='mt-4'>All</h2>
            <div className='col d-flex flex-wrap justify-content-center'>
                { 
                    users.map((user) => <User user={user} key={user._id} socket={socket}></User>)
                }
            </div>
        </div>
    )
}

export default Home;
