import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia'
import { CharacterSmallDto } from "modules/character/CharacterDTOs";

const CharacterCard = ({character}: {character: CharacterSmallDto}) => (
    <CardActionArea component={Link} href={`/character/${character.id}`}>
      <Card sx={{ position: 'relative' }} style={{display: "block", height: '11.5vw'}}>
          <CardContent>
            <Typography variant='h6' data-testid={character.name}>{character.name}</Typography>
          </CardContent>
          <CardMedia
            image={character.image}
            title={character.name}
            style={{height: 0, paddingTop: '66.00%'}}
          />
      </Card>
    </CardActionArea>
)

export default CharacterCard
