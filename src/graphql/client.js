import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: "wss://moosique-share.hasura.app/v1/graphql",
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache()
})

// const client = new ApolloClient({
//     uri: 'https://moosique-share.hasura.app/v1/graphql',
//     cache: new InMemoryCache()
// });

export default client;