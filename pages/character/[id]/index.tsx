import CharacterProfile, {CharacterProp} from 'modules/character/CharacterProfile.view'
import {CharacterGateway} from 'modules/character/CharacterGateway'

const CharacterPage = ({character}: CharacterProp) =>  <CharacterProfile character={character} />

const gateway = CharacterGateway()

export const getServerSideProps = async (ctx: any, _gateway=gateway) => {
    const character = await _gateway.fetchCharacter(ctx.params.id)
    return {
        props: { character },
        notFound: character === null
    }
}

export default CharacterPage