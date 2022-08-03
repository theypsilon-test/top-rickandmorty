import CharacterCard from './CharacterCard.view'
import Grid from '@mui/material/Grid'
import { CharacterSmallDto } from "modules/character/CharacterDTOs"

export interface CharactersProps {
    characters: CharacterSmallDto[]
}

const CharactersCardGrid = ({characters}: CharactersProps) => (
  <Grid container spacing={6}>
      {characters.map(character => (
          <Grid item xs={12} md={3} key={character.id}>
              <CharacterCard character={character}/>
          </Grid>
      ))}
  </Grid>
)


export default CharactersCardGrid
