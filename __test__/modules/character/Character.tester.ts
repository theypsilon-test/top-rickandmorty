import { CharacterSmallDto } from "modules/character/CharacterDTOs";

export const CHARACTER_1 = 'character1'
export const CHARACTER_2 = 'character2'

export const SmallCharacter1 = (): CharacterSmallDto => ({name: CHARACTER_1, id: '1', image: 'http://random.com/image1.png'})
export const SmallCharacter2 = (): CharacterSmallDto => ({name: CHARACTER_2, id: '2', image: 'http://random.com/image2.png'})
