import { useState } from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/apiSevice'
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isShowpassword, setShowpassword] = useState(false)
    const navigate = useNavigate();

    const handleRegister = async () => {
        let data = await postRegister(email, password, username)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate('/Login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const isValiEmail = validateEmail(email);
        if (!isValiEmail) {
            toast.error("Invalid email 🦄")
            // toast.success()
            // toast.info()
            return;
        }
        if (!password) {
            toast.error("invalid password")
            return;
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/Login')}>Log in</button>
            </div>
            <div className='title col-4 mx-auto'>
                Hoang V
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Emai</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password</label>
                    <input
                        type={isShowpassword ? "text" : "password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowpassword ?
                        <span
                            className='icons-eye'
                            onClick={() => setShowpassword(false)}
                        >
                            <VscEye />
                        </span>
                        :
                        <span
                            onClick={() => setShowpassword(true)}
                            className='icons-eye'>
                            <VscEyeClosed />
                        </span>
                    }
                </div><div className='form-group'>
                    <label>Username</label>
                    <input
                        type={"username"}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                    >Register to </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register