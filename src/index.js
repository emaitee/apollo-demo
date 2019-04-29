import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { colors } from './styles'

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io'
})

render(
    <ApolloProvider client={client}>
        <div style={{ height: "100vh", backgroundColor: colors.darkBlue }}>
            <App />
        </div>
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
