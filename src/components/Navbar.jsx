import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout=()=>{
        logout();
        navigate("/login");
    };
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <Link className="navbar-brand" to="/">
                  MERN AUTH
                </Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {!token? (
                            <>
                             <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                 Login
                                </Link>
                             </li>
                             <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                 Register
                                </Link>
                             </li>
                            </>
                        ): (
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
        </nav>
    );
}