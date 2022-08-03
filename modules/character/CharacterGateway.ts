import { ApolloClient, DocumentNode, gql, useQuery } from '@apollo/client';
import { CharacterDto, CharactersPageDto, CharactersSearchCommand, CharactersSearchResultDto } from 'modules/character/CharacterDTOs';
import RickAndMortyApolloClient from 'modules/infrastructure/RickAndMortyApolloClient'

export interface CharacterGateway {
    fetchCharacter(id: string): Promise<CharacterDto | null>;
    fetchInitialCharacters(): Promise<CharactersPageDto>;
    searchCharacters(command: CharactersSearchCommand): Promise<CharactersSearchResultDto>;
    useCharactersSearch(command: CharactersSearchCommand): CharactersSearchResultDto;
}

export const CharacterGateway = (): CharacterGateway => new CharacterApolloClient(RickAndMortyApolloClient())

// Infrastructure layer below

export class CharacterApolloClient implements CharacterGateway {
    constructor(private client: ApolloClient<any>) {}

    async fetchCharacter(id: string): Promise<CharacterDto> {
        const result = await this.client.query({
            query: gql`
            query {
                character(id: ${id}) {
                    name,
                    status,
                    species,
                    type,
                    gender,
                    image
                }
            }`
        })
        return result.data.character
    }

    async fetchInitialCharacters(): Promise<CharactersPageDto> {
        const result = await this.client.query({query: gql`
            query {
            characters(page: 1) {
                info {
                    count,
                    next,
                    prev
                },
                results {
                    id, name, image
                }
            }
            }
        `})
        return result.data
    }

    async searchCharacters(command: CharactersSearchCommand): Promise<CharactersSearchResultDto> {
        const result = await this.client.query({query: this.buildCharacterSearchQuery(command)})
        return result.data
    }

    useCharactersSearch(command: CharactersSearchCommand): CharactersSearchResultDto {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useQuery(this.buildCharacterSearchQuery(command), {client: this.client})
    }

    private buildCharacterSearchQuery({page, filterName, filterStatus, filterSpecies, filterType, filterGender}: CharactersSearchCommand): DocumentNode {
        return gql`
            query {
                characters(page: ${page}, filter: {
                    name: "${filterName}",
                    status: "${filterStatus}",
                    species: "${filterSpecies}",
                    type: "${filterType}",
                    gender: "${filterGender}"
                }) {
                    info {
                        count,
                        next,
                        prev
                    },
                    results {
                        id, name, image
                    }
                }
            }
        `
    }
}
