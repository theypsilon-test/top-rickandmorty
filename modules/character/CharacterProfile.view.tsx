import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { CharacterDto } from "modules/character/CharacterDTOs"

export interface CharacterProp {
    character: CharacterDto
}

export const CharacterProfilePresenter = ({character, router}: CharacterProp & {router: ReturnType<typeof useRouter>}) => (
    <>
        <Button onClick={() => router.back()}>Back</Button>
        <Card style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <CardMedia
                component="img"
                image={character.image}
                alt={character.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h2' component="div">
                    {character.name}
                </Typography>
                <Grid container spacing={6}>
                    {character.species && <Grid item xs={12} md={4}><strong>Species</strong><br/>{character.species}</Grid>}
                    {character.gender && <Grid item xs={12} md={4}><strong>Gender</strong><br/>{character.gender}</Grid>}
                    {character.type && <Grid item xs={12} md={4}><strong>Type</strong><br/>{character.type}</Grid>}
                    {character.status && <Grid item xs={12} md={4}><strong>Status</strong><br/>{character.status}</Grid>}
                </Grid>
            </CardContent>
        </Card>
    </>
)

const CharacterProfile = ({character}: CharacterProp) => CharacterProfilePresenter({character, router: useRouter()})

export default CharacterProfile
