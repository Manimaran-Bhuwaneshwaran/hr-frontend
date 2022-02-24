import { BrowserRouter, Route, Routes } from "react-router-dom";
import Completion from "./components/Completion";
import Appreciation from "./components/Appreciation";
import Participation from "./components/Participation";
import Appointment from "./components/Appointment";
import Home from "./components/Home";
import LOR from "./components/LOR";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./actions/userActions";
import AdminLogin from "./components/AdminLogin";
import AdminAccess from "./components/AdminAccess";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // let navigate = useNavigate();

  // const handleLogout = () => {
  //   if (userInfo) {
  //     navigate("/");
  //     dispatch(logout());
  //   }
  // };
  return (
    <BrowserRouter>
      <Navbar />
      {/* <>
        {
          userInfo ? (
            <><Link to="/"><button>Home</button></Link>
              <button onClick={handleLogout}>Logout</button>
              Welcome, {userInfo.data.name}
            </>
          ) : (
            <>
              <Link to="/"><button>Home</button></Link><br />
              <Link to="/signin"><button>Signin</button></Link>
              <Link to="/signup"><button>Signup</button></Link>

            </>
          )}
      </> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/sendcompletioncertificate"
          element={<Completion />}
        />
        <Route
          exact
          path="/sendparticipationcertificate"
          element={<Participation />}
        />
        <Route
          exact
          path="/sendappreciationcertificate"
          element={<Appreciation />}
        />
        <Route exact path="/sendappointmentletter" element={<Appointment />} />
        <Route exact path="/sendLOR" element={<LOR />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/access" element={<AdminAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
