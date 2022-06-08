import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function SignUp(){

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token')){
            return navigate('/');
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:8000/api/users/sign-up",
            data: {
                name,
                email,
                password,
                confirmPassword,
                imageUrl
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            if(res.data.valid){
                navigate('/users/sign-in');
            }
        });
    }
    return (
        <div className="container my-5">
            <div className="row">
                <div className="mx-auto border" style={{width: '650px'}}>
                    <h2 className="col text-center my-5">Sign Up</h2>
                    <form className="row g-3" action="/users/create" method="post">
                        <div className="col-md-6">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value);}}/>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputConfirmPassword4" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value);}}/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="imageUrl" className="form-label">Image Url</label>
                            <input type="text" className="form-control" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value);}}/>
                        </div>
                        <div className="col text-center my-5">
                        <button type="submit" className="btn btn-primary mx-auto" onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
</div>
    )
}