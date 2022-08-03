import { CharacterGateway } from 'modules/character/CharacterGateway'
import { mock } from 'jest-mock-extended';
import { CharactersPageDto } from 'modules/character/CharacterDTOs';
import { SmallCharacter1, SmallCharacter2 } from './Character.tester';

export const InitialCharacters = (): CharactersPageDto => ({
    characters: {
        info: {
            count: 3,
            next: 3,
            prev: 1,
        },
        results: [SmallCharacter1()],
    }
})

export const UpdatedCharacters = (): CharactersPageDto => ({
    characters: {
        info: {
            count: 3,
            next: -1,
            prev: 2,
        },
        results: [SmallCharacter2()],
    }
})

export const CharacterGatewayStub = ({useCharactersSearch, fetchCharacter, fetchInitialCharacters, searchCharacters}: any = {}): CharacterGateway => {
    const stub = mock<CharacterGateway>()
    stub.useCharactersSearch.mockReturnValue(useCharactersSearch || {data: UpdatedCharacters()})
    stub.fetchCharacter.mockReturnValue(fetchCharacter || null)
    stub.fetchInitialCharacters.mockReturnValue(fetchInitialCharacters || InitialCharacters())
    stub.searchCharacters.mockReturnValue(searchCharacters || {})
    return stub
}
