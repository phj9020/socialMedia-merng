import React from 'react';
import useUser from '../hooks/useUser';
import {Route, Redirect} from 'react-router-dom';


function AuthRoute({component:Component, ...rest}) {
    const {data} = useUser();

    return (
        <Route 
            {...rest}
            render={props => 
                data ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

export default AuthRoute
