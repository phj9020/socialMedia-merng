import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../client";

const ME_QUERY = gql`
    query me {
        me {
            id
            email
            token
            username
            createdAt
        }
    }
`

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    // skip this query if user is not logged in with localStorage Token
    const {data} = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    
    useEffect(()=> {
        if(data?.me === null) {
            console.log("There is a token on localStorage but not working on back-end");
            logUserOut();
        }
    },[data])

    return {data: data};
}

export default useUser;