import Grid from '@mui/material/Grid'
import CharactersCardGrid from 'modules/character/CharactersCardGrid.view'
import Button from '@mui/material/Button'
import { Alert } from '@mui/material';
import TextFilter from 'modules/generic_components/TextFilter';
import { CharactersPageDto, buildSearchCharacterCommand } from "modules/character/CharacterDTOs";
import { CharacterGateway } from './CharacterGateway';
import { useRouter, NextRouter } from 'next/router';

export const ALERT_NO_CHARACTERS = 'alert-no-characters'
export const ALERT_ERROR = 'alert-error'
export const PREV_BUTTON = 'prev-button'
export const NEXT_BUTTON = 'next-button'
export const RESET_BUTTON = 'reset-button'

export const useCharactersSearch = (initialCharacters: CharactersPageDto, router: NextRouter, characterGateway: CharacterGateway) => {

    const searchCommand = buildSearchCharacterCommand(router.query)

    const { error, data, previousData } = characterGateway.useCharactersSearch(searchCommand)
  
    const actualData = data ?? previousData ?? initialCharacters
  
    const characters = actualData.characters.results
    const {prev, next} = actualData.characters.info
  
    const hasPrev = prev > 0
    const hasNext = next > 0
  
    const updateQueryString = (key: string, value: string) => {
      router.query = {...router.query, [key]: value}
      if (value === "") {
        delete router.query[key]
      }
      router.push(router, undefined, {shallow: true})
    }

    const onFilterChanged = (key: string) => {
      return (value: string) => {
        delete router.query['page']
        updateQueryString(key, value.trim())
      }
    }

    const onReset = async () => {
        router.query = {}
        await router.push(router, undefined, {shallow: true})
        router.reload()
    }
  
    return {
      characters,
      error, 
      hasPrev, 
      hasNext,
      onNext: () => updateQueryString('page', next.toString()), 
      onPrev: () => updateQueryString('page', prev.toString()),
      onReset,
      filters: [
        {defaultValue: searchCommand.filterName, label: 'Name', handler: onFilterChanged('filterName')},
        {defaultValue: searchCommand.filterSpecies, label: 'Species', handler: onFilterChanged('filterSpecies')},
        {defaultValue: searchCommand.filterStatus, label: 'Status', handler: onFilterChanged('filterStatus')},
        {defaultValue: searchCommand.filterType, label: 'Type', handler: onFilterChanged('filterType')},
        {defaultValue: searchCommand.filterGender, label: 'Gender', handler: onFilterChanged('filterGender')},
      ],
    }
}

export interface InitialCharactersProps {
    initialCharacters: CharactersPageDto
}

export const CharactersSearchPanelPresenter = ({characters, error, hasPrev, hasNext, onNext, onPrev, onReset, filters}: ReturnType<typeof useCharactersSearch>) => (
    <>
        {error && <Alert severity="error" data-testid={ALERT_ERROR}>${error.message}</Alert>}
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {filters.map(({defaultValue, label, handler}) =>
                        <TextFilter
                            key={label}
                            label={label}
                            defaultValue={defaultValue}
                            handler={handler}
                        />)}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {characters.length ? (
                    <>
                        <CharactersCardGrid characters={characters}/>
                        <Grid container justifyContent="center">
                            {hasPrev && <Button data-testid={PREV_BUTTON} onClick={onPrev}>
                                Previous Page
                            </Button>}
                            {hasNext && <Button data-testid={NEXT_BUTTON} onClick={onNext}>
                                Next Page
                            </Button>}
                        </Grid>
                    </>
                ): (
                    <>
                        <Alert severity="info" data-testid={ALERT_NO_CHARACTERS}>No characters found</Alert>
                        <Grid container justifyContent="center">
                            <Button data-testid={RESET_BUTTON} onClick={onReset}>
                                Reset
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    </>
);

const CharactersSearchPanel = ({initialCharacters}: InitialCharactersProps) => CharactersSearchPanelPresenter(
    useCharactersSearch(initialCharacters, useRouter(), CharacterGateway())
)

export default CharactersSearchPanel
  