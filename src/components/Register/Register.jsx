import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'reactstrap'

import RegisterFormControl from './RegisterFormControl.jsx'
import { registerUserAction } from '../../actions/userActions.js'


class Register extends Component {

    state = {
        data: {
            username: '',
            email:'',
            number:'',
			phonenumber:'',
            password: ''
        },
        errors: {}
    }

    validate = () => {
        const { data } = this.state
        const errors = {}

        if (data.username === '') errors.username = 'Username cannot be blank.'
        if (data.password === '') errors.password = 'Password cannot be blank.'
        if (data.email === '') errors.email = 'Email cannot be blank.'
        if (data.number === '') errors.number = 'PhoneNumber cannot be blank.'
        if (data.phonenumber === '') errors.phonenumber = 'Phone number cannot be blank.'
        if(data.email !=''){
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
         if (!pattern.test(data.email)) errors.email = 'Invalid email address'
        }
		if(data.number !==''){
			var pattern = new RegExp(/^[0-9\b]+$/);
			if (!pattern.test(data.number) ){
				errors.number = 'Please enter only number.'
			}else if(data.number.length != 10){
				errors.number = 'Please enter 10 digit valid contact number. '
			}
		}
		
        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { data } = this.state
        const errors = this.validate()

        if (Object.keys(errors).length === 0) {
            this.props.register(data)

            this.setState({
                data: {
                    username: '',
                    email: '',
                    number: '',
                    phonenumber: '',
                    password: ''
                },
                errors: {}
            })
        } else {
            this.setState({
                errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.id]: ''
            }
        })
    }

    render() {
        const { data, errors } = this.state

        return (
            <Row>
                <Col md={4}>
                    <Form onSubmit={this.handleSubmit}>
                        <RegisterFormControl
                            label="Username"
                            type="text"
                            value={data.username}
                            handleChange={this.handleChange}
                            error={errors.username}
                        />
                        <RegisterFormControl
                            label="Email"
                            type="text"
                            value={data.email}
                            handleChange={this.handleChange}
                            error={errors.email}
                        />
						<RegisterFormControl
                            label="Number"
                            type="text"
                            value={data.number}
                            handleChange={this.handleChange}
                            error={errors.number}
                        />
                        <RegisterFormControl
                            label="Password"
                            type="password"
                            value={data.password}
                            handleChange={this.handleChange}
                            error={errors.password}
                        />

                        <Button color="primary">Register</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (creds) => {
            dispatch(registerUserAction(creds))
        }
    }
}

export default connect(null, mapDispatchToProps)(Register)