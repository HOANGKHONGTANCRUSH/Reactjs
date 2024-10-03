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
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import MangageQuiz from './components/Admin/content/Quiz/MangageQuiz';

const Layout = (props) => {
    const NotFound = () => {
        return (
            <div class="container mt-3 alert alert-danger">
                404.Not found data with your current URL
            </div>
        )
    }


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
                    <Route path='/users' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<MangageQuiz />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />

                <Route path="*" element={<NotFound />} />

            </Routes>
            <ToastContainer />
        </div>
    )
}
export default Layout