import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../Constants';
import AppHeader from '../../components/AppHeader';
import { LoginContext } from '../../contexts/LoginContext';

function LoginPage() {
    let history = useHistory();

    const {
        loggedInUser,
        isLoggedIn,
        setLoginUserDetails,
        logoutUser } = useContext(LoginContext);

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(setLoginUserDetails);
        console.log(isLoggedIn);


    }, [])

    const changeUserId = (e) => {

        /**
         * Set user id from input
         */
        //rk
         setUserId(e.target.value)


    }

    const changePassword = (e) => {
        /**
         * Set password from input
         */
        //rk
         setPassword(e.target.value);
    }

    const verifyLogin = async (e) => {

        e.preventDefault();
        console.log(userId, " /", password);

        let loginDetail = {
            userId: userId,
            password: password
        }

        // navigating to the homepage after login success
        await axios.post(API_URL + 'ccuser/login', loginDetail)
            .then(response => {
                console.log(response);
                setUserId('');
                setPassword('');
                //RK:  updating the login context
                setLoginUserDetails(response.data.body)
                //RK: navigating to the homepage after login
                history.push('/');
                //RK: change button text to LogOut
                document.getElementById('logbtn').innerText="Log Out";

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('error', error.message);

                }
                setUserId('');
                setPassword('');

            })

    }
    
    return (
        <div className="login-page container">

            <h3>Welcome to SmartBank Credit card</h3>
            <hr></hr>

            <div className="login-form">
                <div className="row">
                    <div className="col-md-6">
                        {/* call the verify login function to get the response from API server  */}
                        <form onSubmit={verifyLogin}>

                            <div className="form-group">
                                <label>
                                    <h5>
                                        <i className="fas fa-user"></i>&nbsp;User id
                                    </h5>
                                </label>
                                <input type="text" value={userId} required className="form-control" onChange={changeUserId} />
                            </div>

                            <div className="form-group">
                                <label><h5><i className="fas fa-lock"></i>&nbsp;Password</h5></label>
                                <input type="password" value={password} required className="form-control" onChange={changePassword} />
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;