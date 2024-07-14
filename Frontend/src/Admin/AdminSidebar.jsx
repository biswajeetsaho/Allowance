
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import "../Admin/AdminSidebar.css";



const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="window">

        <Header />
        <div className="layout">

          <nav className="dashboard">
            <h2 onClick={() => navigate("/admin/homePage")}> Admin Page </h2>
            <ul>
              <li>
                <NavLink to="/admin/dashboad">DashBoad</NavLink>
              </li>
              <li>
                <NavLink to="/admin/createUser">Create New User</NavLink>
              </li>
              <li>
                <NavLink to="/admin/verifyEmployee">verify Employee registration</NavLink>
              </li>
            </ul>
            <button className="logoutbtn" onClick={handleLogout}>
              Logout <MdLogout />
            </button>
          </nav>
          <div className="main-content">
            <Outlet />
            {/* <Navigate to="/admin/createUser" /> */}
          </div>
          <Footer /> 
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
