import {InMemoryCache} from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client';
import {split} from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
import VueApollo from 'vue-apollo'
import {HttpLink} from 'apollo-link-http'

// eslint-disable-next-line no-unused-vars
const endpoint = "https://cold-rain.eu-central-1.aws.cloud.dgraph.io/graphql'"
// eslint-disable-next-line no-unused-vars
const token = "secret"




// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const httpsLink = new HttpLink({
    uri: 'https://cold-rain.eu-central-1.aws.cloud.dgraph.io/graphql',
    options: {
        reconnect: true
    }
})
// Create the subscription websocket link
const wsLink = new WebSocketLink( {
  uri: 'wss://cold-rain.eu-central-1.aws.cloud.dgraph.io/graphql',
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpsLink
)



// Create the apollo client
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export {
    apolloProvider
}
