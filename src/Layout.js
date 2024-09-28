import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Homepage from './components/Home/Homepage';
import ManageUser from './components/Admin/content/ManageUser';
import DashBoard from './components/Admin/content/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';

const Layout = (props) => {
    const notify = () => {
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    return (
        <div>
            <Routes>
                <Route Route path='/' element={<App />}>
                    <Route path='/homepages' element={<Homepage />} />
                    <Route path='/users' element={<User />} />
                </Route>
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />

            </Routes>
            <ToastContainer />
        </div>
    )
}
export default Layout