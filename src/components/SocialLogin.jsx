import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const SocialLogin = () => {
    const { GoogleLogin, GithubLogin } = useContext(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        GoogleLogin()
            .then((result) => {
                // console.log(result.user);
                const user = result.user.email;

                //get access token
                axios.post('https://booked-inn-server.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            toast.success('Google account logged in successfully!');
                            navigate(location?.state ? location.state : '/');
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to log in with Google account. Please try again.');
            })
    };

    const handleGithubLogin = () => {
        GithubLogin()
            .then(() => {
                // console.log(result.user);
                toast.success('GitHub account logged in successfully!');
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to log in with GitHub account. Please try again.');
            })
    };

    return (
        <div className='mx-auto flex justify-center gap-5 mb-5'>
            <button onClick={handleGoogleLogin} className='btn btn-outline h-16'>
                <FcGoogle size={40} />
            </button>
            <button onClick={handleGithubLogin} className='btn btn-outline h-16'>
                <FaGithub size={40} />
            </button>
        </div>
    );
};

export default SocialLogin;