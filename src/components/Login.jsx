import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError]= useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleChange=(e)=>{
          setForm({ ...form, [e.target.name]: e.target.value})
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            login(res.data.token);
            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };
    return(
          <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{width: "400px"}}>
                <h3 className="text-center mb-3">Login</h3>
                  {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-primary w-100">
                        Login
                    </button>
                    <div className="text-center mt-3">
                    <small>
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </small>
                   </div>
                    </form>  
            </div>
          </div>
    );
}