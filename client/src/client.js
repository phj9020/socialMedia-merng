import { ApolloClient, InMemoryCache, makeVar, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = 'token';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, `Bearer ${token}`);
    isLoggedInVar(true);
};

export const logUserOut = ()=> {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    window.location.href = '/';
}

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});


const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: localStorage.getItem(TOKEN),
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    },
    connectToDevTools: true,
});

export default client;