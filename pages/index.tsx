import CharactersSearchPanel, { InitialCharactersProps } from 'modules/character/CharactersSearchPanel.view'
import {CharacterGateway} from 'modules/character/CharacterGateway'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import { buildSearchCharacterCommand } from 'modules/character/CharacterDTOs'

const MainPage = ({initialCharacters}: InitialCharactersProps) => {
  return (
    <ApexChartWrapper>
      <CharactersSearchPanel initialCharacters={initialCharacters} />
    </ApexChartWrapper>
  )
}

const gateway = CharacterGateway()

export async function getServerSideProps(ctx: any, _gateway=gateway) {
  const initialCharacters = await _gateway.searchCharacters(buildSearchCharacterCommand(ctx.query))

  return {
    props: {
      initialCharacters
    }
  }
}

export default MainPage
