import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token')){
            return navigate('/');
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:8000/api/users/create-session",
            data: {
                email,
                password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            let token = res.data.data.token;
            if(token){
                localStorage.setItem('token', 'Bearer ' + token);
                navigate('/');
            }
        });
    }

    return(
        <div className="container my-5">
                <div className="row">
                    <div className="mx-auto border" style={{width:'650px'}}>
                        {
                            localStorage.getItem('token') &&
                                (<h3>Already Signed In</h3>)
                            
                        }
                        <h2 className="col text-center my-5">Sign In</h2>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                            </div>
                            
                            <div className="col text-center my-5">
                                <button type="submit" className="btn btn-primary mx-auto">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}