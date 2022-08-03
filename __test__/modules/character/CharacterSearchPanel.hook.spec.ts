/* eslint-disable react-hooks/rules-of-hooks */
import { useCharactersSearch } from 'modules/character/CharactersSearchPanel.view'
import '@testing-library/jest-dom'
import { NextRouter } from 'next/router'
import { CharacterGatewayStub, InitialCharacters, UpdatedCharacters } from '__test__/modules/character/CharacterGateway.tester'

describe('Character Search Panel Hook', () => {

    const hook = ({gateway}: any = {}) => useCharactersSearch(InitialCharacters(), {query: {}} as NextRouter, gateway || CharacterGatewayStub())

    describe('always', () => {
        const always_hook = hook

        it('should return 5 filters', () => {
            const { filters } = always_hook()
            expect(filters.length).toEqual(5)
        })
    })

    describe('when data is not coming', () => {
        const data_not_coming_hook = () => hook({gateway: CharacterGatewayStub({useCharactersSearch: {data: undefined}})})

        it('should return the initial characters', () => {
            const { characters } = data_not_coming_hook()
            expect(characters).toEqual(InitialCharacters().characters.results)
        })
    })

    describe('when data arrives', () => {    
        const data_arrives_hook = hook

        it('should return the updated characters', () => {
            const { characters } = data_arrives_hook()
            expect(characters).toEqual(UpdatedCharacters().characters.results)
        })
    })
})
