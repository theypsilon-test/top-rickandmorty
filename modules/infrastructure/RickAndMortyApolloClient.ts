import { ApolloClient, InMemoryCache } from '@apollo/client';

let rickAndMortyApolloClientInstance: ApolloClient<any> | null = null
const RickAndMortyApolloClient = () => {
    if (rickAndMortyApolloClientInstance === null) {
        rickAndMortyApolloClientInstance = new ApolloClient({
            cache: new InMemoryCache(),
            uri: 'https://rickandmortyapi.com/graphql',
            name: 'react-web-client',
            version: '1.3',
            queryDeduplication: false,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-first',
                },
            },
        })
    }
    return rickAndMortyApolloClientInstance
}

export default RickAndMortyApolloClient
