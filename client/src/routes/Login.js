import React, {useState, useEffect} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import {useLocation} from 'react-router-dom';
import { USER_FRAGMENT } from '../fragment';
import { logUserIn } from '../client';
import {useHistory} from 'react-router-dom';

const LOGIN_MUTATION = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(username:$username, password:$password) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`


function Login() {
    let history = useHistory();
    let location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [login, {loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted : (data) => {
            logUserIn(data.login.token);
            history.push("/");
        },
        onError: (err)=> {
            if(err) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        }
    });

    useEffect(()=> {
        if(location?.state?.data) {
            const {state : {data: {register : {username}}}} = location;
            setUsername(username)
        };
    },[location])

    const handleInputChange = (e) => {
        if(e.currentTarget.name === "username") {
            const {value} = e.currentTarget;
            setUsername(value);
        } else if (e.currentTarget.name === "password") {
            const {value} = e.currentTarget;
            setPassword(value);
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(loading) {
            return;
        }
        // logg in 
        login({
            variables: {
                username, password
            }
        });
    }

    return (
        <div className="login_form">
            <h1>Login</h1>
            <Form noValidate onSubmit={handleOnSubmit}>
                <Form.Field required>
                    <label>Username</label>
                    <Form.Input 
                        type="text"
                        placeholder='Username' 
                        name="username" 
                        value={username} 
                        autoComplete="username"
                        onChange={handleInputChange} 
                        />
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <Form.Input
                        type="password" 
                        placeholder='Password' 
                        name="password"
                        value={password} 
                        autoComplete="new-password"
                        onChange={handleInputChange} 
                        />
                </Form.Field>
                <Button type='submit' primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 ? 
                <div className="ui negative message">
                    <ul className="list">
                        {Object.values(errors).map(error => <li key={error}>{error}</li>)}
                    </ul>
                </div>
                : null
            }
        </div>
    )
}

export default Login
