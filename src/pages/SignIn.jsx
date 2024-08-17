import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Helmet } from "react-helmet";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/SocialLogin";


const SignIn = () => {

    const { signIn } = useContext(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const [LogError, setLogError] = useState('');
    const [LogSuccess, setLogSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const email = form.get('email');
        const password = form.get('password');

        console.log(email, password);

        setLogError('');
        setLogSuccess('');


        signIn(email, password)
            .then(() => {
                // console.log(result.user);
                const user = { email };
                
                //get access token
                axios.post('https://booked-inn-server.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            toast.success("Login successful!");
                            navigate(location?.state ? location.state : '/');
                        }
                    })
            })
            .catch(error => {
                console.log(error);
                setLogError(error.code.split('auth/')[1]);
                toast.error("Check your email and password!");
            })

        setFormValues({
            email: "",
            password: ""
        });
    }

    return (
        <div className="hero">
            <Helmet>
                <title>BookedInn | Login</title>
            </Helmet>
            <div className="my-11 text-primary">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-mar font-bold my-10">Login account</h1></div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl rounded-none p-2">
                    <form onSubmit={handleLogin} className="card-body border-2 border-primary">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                value={formValues.email}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, email: e.target.value })
                                }
                                required name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPass ? "text" : "password"}
                                value={formValues.password}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, password: e.target.value })
                                }
                                required name='password' placeholder="password" className="input input-bordered" />
                            <label className="label"><span className="relative bottom-10 left-48" onClick={() => setShowPass(!showPass)}>{
                                showPass ? <VscEyeClosed></VscEyeClosed> : <VscEye />} </span></label>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn bg-primary rounded-none">Sign In</button>
                        </div>

                    </form>
                    {
                        LogError && <p className="text-red-700 ml-7 -mt-6 mb-4">*{LogError}</p>
                    }
                    {
                        LogSuccess && <p className="text-green-700 text-center -mt-6 mb-4">{LogSuccess}</p>
                    }
                    <p className='mb-2 text-xl flex justify-center items-center gap-2'> <span> <hr className='w-20' /> </span> <span> Or </span> <hr className='w-20' /> </p>
                    <SocialLogin></SocialLogin>
                    <p className='mx-auto pb-5'> Don`t have an account <Link to={'/signup'} className='font-bold'>Register</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;