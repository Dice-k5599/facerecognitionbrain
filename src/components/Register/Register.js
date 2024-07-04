import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            unableToRegister: false
        }
    }

    // state changing functions on click of each input box
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('https://smart-brain-api-jik1.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then((user) => {
                if (user.id)
                {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                    this.setState({unableToRegister: false});
                }
                else
                {
                    this.setState({unableToRegister: true});
                }
            })
            .catch((error) => {console.log("Unable to register")});
    }
    
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0"
                        >
                            <legend className="white f1 fw6 ph0 mh0">
                                Register
                            </legend>
                            {
                                this.state.unableToRegister
                                ?
                                <p
                                    className="yellow w-100"
                                >
                                Unable to register user.
                                </p>
                                : <div />
                            }
                            <div className="mt3">
                                <label
                                    className="white db fw6 lh-copy f6"
                                    htmlFor="email-address"
                                >
                                    Name
                                </label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba b--white bg-white hover-black w-100"
                                    type="text"
                                    name="name"
                                    id="email-address"
                                />
                            </div>
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
                                    className="pa2 input-reset ba b--white bg-white hover-black w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;