import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const authLink = setContext(() => {
    const token = localStorage.getItem(localStorage.key(0));
    // console.log('This is localStorage: ' + JSON.stringify(localStorage))     //gives localStorage object
    // console.log('This is localStorage.key(0): ' + localStorage.key(0))       //gives 'jwtToken'
    console.log('This is localStorage.getItem(localStorage.key(0)): ' + localStorage.getItem(localStorage.key(0)))
    // console.log(localStorage.getItem('jwtToken'))                            //Gives same as above

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);