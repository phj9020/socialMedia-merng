import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import {useHistory} from 'react-router-dom';
import { USER_FRAGMENT } from '../fragment';

const REGISTER_MUTATION = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        ) {
        register(
            registerInput: {
                username:$username, 
                password:$password, 
                confirmPassword:$confirmPassword, 
                email:$email
            }) {
                ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;


function Register() {
    let history = useHistory();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username:'',
        password:'',
        confirmPassword: '',
        email: ''
    });



    const [register, {loading}] = useMutation(REGISTER_MUTATION, {
        onCompleted : (data) => {
            history.push("/login", {data})
        },
        onError : (err) => {
            if(err) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        }
    });

    const handleInputChange = (e) => {
        setValues({...values, [e.currentTarget.name] : e.currentTarget.value});
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(loading) {
            return;
        }
        register({
            variables : values,
        });
    }
    return (
        <div className="register_form">
            <h1>Register</h1>
            <Form noValidate onSubmit={handleOnSubmit}>
                <Form.Field required>
                    <label>Username</label>
                    <Form.Input 
                        type="text"
                        placeholder='Username' 
                        name="username" 
                        value={values.username} 
                        error={errors?.username ? true : false}
                        onChange={handleInputChange} 
                        />
                </Form.Field>
                <Form.Field required>
                    <label>Email</label>
                    <Form.Input 
                        type="email"
                        placeholder='Email' 
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        error={errors?.email ? true : false}
                        onChange={handleInputChange}
                        />
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <Form.Input
                        type="password" 
                        placeholder='Password' 
                        name="password"
                        value={values.password} 
                        error={errors?.password ? true : false}
                        autoComplete="new-password"
                        onChange={handleInputChange} 
                        />
                    
                </Form.Field>
                <Form.Field required>
                    <label>Confirm Password</label>
                    <Form.Input
                        type="password" 
                        placeholder='Confirm Password' 
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={errors?.confirmPassword ? true : false}
                        autoComplete="new-password"
                        onChange={handleInputChange}
                        />
                </Form.Field>
                <Button type='submit' primary>Create Account</Button>
            </Form>
            {Object.keys(errors).length > 0 ? 
                <div className="ui negative message">
                    <ul className="list">
                        {Object.values(errors).map(error => <li key={error}>{error}</li>)}
                    </ul>
                </div>
                :
                null
            }
        </div>
    )
}

export default Register
