import userEvent from "@testing-library/user-event";
import React, { Component } from "react";

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            wrongCredential: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('https://smart-brain-api-jik1.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then((data) => {
                if (data.id)
                {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                    this.setState({wrongCredential: false});
                }
                else
                {
                    this.setState({wrongCredential: true});
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0"
                        >
                            <legend className="white f1 fw6 ph0 mh0">
                                Sign In
                            </legend>
                            {
                                this.state.wrongCredential
                                ?
                                <p
                                    className="yellow w-100"
                                >
                                Wrong email or password.
                                </p>
                                : <div />
                            }
                            <div className="mt3">
                                <label
                                    className="white db fw6 lh-copy f6"
                                    htmlFor="email-address"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba b--white bg-white hover-black w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label
                                    className="white db fw6 lh-copy f6"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba b--white bg-white hover-bg-white hover-black w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                className="black f6"
                            >
                                New user?</p>
                            <p  
                                onClick={() => onRouteChange('Register')}
                                className="white b mt0 mb0 pointer dim f6 dib"
                            >
                                Register
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;