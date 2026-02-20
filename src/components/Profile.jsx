import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Profile(){
    const [user, setUser] = useState(null);
    const {logout} = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
  const fetchProfile = async () => {
     try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
     } catch (err) {
      logout();
      navigate("/login");
     }
     };

     fetchProfile();
     }, [logout, navigate]);
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: "90vh"}}>
            <div className="card shadow-lg p-4 text-center" style={{width: "420px", borderRadius:"15px"}}>
               <div className="mb-4">
                <div style={{width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#0d6efd", color: "white", fontSize: "30px",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto"
                }}>
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
               </div>
              <h4 className="mb-3">Welcome, {user?.name}</h4>
              {user ? (
                <>
                 <div className="text-smart mb-3">
                   <p className="mb-1"><strong>Email:</strong></p>
                   <p className="text-muted">{user.email}</p>
                 </div>
                 <button className="btn btn-danger w-100" onClick={()=>{
                    logout();
                    navigate("/login");
                 }}>
                    Logout
                 </button>
                </>
              ):(
                <p>Loading...</p>
              )}
            </div>

        </div>
    );
}