import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axiosConfig";

export default function Register(){
    const[form, setForm] = useState({name: "", email: "", password: ""});
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setForm({ ...form, [e.target.name]: e.target.value})
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("Registration successful Login now");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{width: "400px"}}>
             <h3 className="text-center mb-3">Register</h3>
             {error && <div className="alert alert-danger">{error}</div>}
             <form onSubmit={handleSubmit}>
               <div className="mb-3">
                 <input type="text" 
                         name="name"
                         className="form-control"
                         placeholder="Name"
                         value={form.name}
                         onChange={handleChange}
                         required/>
               </div>
               <div className="mb-3">
                 <input type="email" 
                         name="email"
                         className="form-control"
                         placeholder="Email"
                         value={form.email}
                         onChange={handleChange}
                         required/>
               </div>
               <div className="mb-3">
                 <input type="password" 
                         name="password"
                         className="form-control"
                         placeholder="Password"
                         value={form.password}
                         onChange={handleChange}
                         required/>
               </div>
                   <button className="btn btn-success w-100">
                      Register
                   </button>
                   <div className="text-center mt-3">
                   <small>
                     Already have an account?{" "}
                     <Link to="/login">Login</Link>
                   </small>
                </div>
             </form>
            </div>
        </div>
    );
}