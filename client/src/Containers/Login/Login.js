import React,{Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import axios from 'axios';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    submitForm = async (e) => {
        e.preventDefault()
        await axios.post('/api/v1/auth', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            sessionStorage.setItem('token', res.data.token);
            this.state.history.push('/');
        }, (error) => {
            console.log(error);
        })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        this.setState({
          [ name ]: value,
        });
    }
    
    render(){
        let login=(
            <div className="loginForm">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                <Col>
                    <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="myemail@email.com"
                        onChange={ (e) => {
                            this.handleChange(e)
                        } }
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        onChange={ (e) => {
                            this.handleChange(e)
                        } }
                    />
                    </FormGroup>
                </Col>
                <Button>Submit</Button>
                </Form>
            </div>
        );

        return(
            <div>
                {login}
            </div>
        );
    }
}

export default Login;