//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as Components from '../../../materialui/Imports'
import logo from '../../../images/icon-left-font-monochrome-black.png'
import { useForm } from "react-hook-form";
/** Login function **/


function Login(props) {
    useEffect(() => {
    }, [])

    //Set state
    const [state, setState] = useState({
       // pseudo: "",
        email: "",
        password: "",
        token: "",
        successMessage: null,
        errorMessage: "",
       // createdAt: "",
       // updatedAt: ""
    })

    let history = useHistory();
    //Handlechange for form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    // Login onClick 
    const onClickSubmit = (e) => {

        const payload = {
            "email": state.email,
            "password": state.password,
            //"pseudo": state.pseudo,
            //"createdAt": state.createdAt,
            //"updatedAt": state.updatedAt
        }

        axios.post("http://localhost:3000/api/auth/login", payload)
            .then(function (response) {
                var adminData = response.config.data
                const admin = JSON.parse(adminData)
                if (admin.email === 'moderateur@groupomania.com' && admin.password === 'Gg123456789@') {
                    setState(prevState => ({
                        ...prevState,
                    }))
                    props.setLogin(response.data);
                    console.log('propsSetLogin = ' + response);
                    Cookies.set('token', response.data.token);
                    Cookies.set('userId', response.data.userId);
                   // Cookies.set('pseudo', response.data.pseudo);
                    history.push('/admin')
                }
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }))
                    props.setLogin(response.data);
                    Cookies.set('token', response.data.token);
                    Cookies.set('userId', response.data.userId);
                    window.location.reload()
                    props.history.push('/messages')

                }
                else if (response.data.code === 204) {
                    console.log(response);
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
               
                setState({ errorMessage: err.message });
            });
    }

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        console.log(data)

        onClickSubmit()

    };

    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    <Components.Paper elevation={9} className="login-box">
                        <section className="message-list" >
                            <img src={logo} alt="logo" className="login-logo"></img>
                            <Components.Button color="primary">
                                <p>Connexion</p>
                            </Components.Button>
                            <div >
                                <form className="login__input" onSubmit={handleSubmit(onSubmit)}>
                                    
                                    <div>
                                        <Components.TextField
                                            //inputRef={register({
                                            //    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                            //})}
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email*"
                                            required maxLength="50"
                                            value={state.email}
                                            onChange={handleChange}
                                            label="email" />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            //inputRef={register({
                                            //    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                            //})}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="mot de passe*"
                                            required maxLength="50"
                                            value={state.password}
                                            onChange={handleChange}
                                            label="mot de passe"
                                        />
                                    </div>
                                    <div className="login__button">
                                        <Components.Button
                                            variant="outlined"
                                            color="primary"
                                            type="submit"
                                            onClick={onClickSubmit}
                                            id="submit"
                                        >VALIDER
                                          </Components.Button>
                                    </div>
                                    <div className="login__input">
                                        <span>Vous n'êtes pas encore enregistré ? </span>
                                        <Link to={'/'}>
                                            <Components.Button color="primary">Inscrivez-vous</Components.Button>
                                        </Link>
                                    </div>
                                </form>
                            </div>

                        </section>
                    </Components.Paper>
                </main>
                <Footer />
            </section>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Login);