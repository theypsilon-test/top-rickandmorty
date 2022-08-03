import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CHARACTER_1, SmallCharacter1 } from './Character.tester'
import { CharactersSearchPanelPresenter, ALERT_NO_CHARACTERS, ALERT_ERROR, NEXT_BUTTON, RESET_BUTTON, PREV_BUTTON } from 'modules/character/CharactersSearchPanel.view'

describe('Character Search Panel Presenter', () => {

    const FILTER_1 = 'filter1'
    const FILTER_2 = 'filter2'

    const props = ({ characters, error, hasPrev, hasNext, onNext, onPrev, onReset, filters}: any = {}) => ({
        characters: characters || [SmallCharacter1()],
        error: error || undefined,
        hasPrev: hasPrev || true,
        hasNext: hasNext || true,
        onNext: onNext || (() => {}),
        onPrev: onPrev || (() => {}),
        onReset: onReset || (async () => {}),
        filters: filters || [{defaultValue: "", label: FILTER_1, handler: () => {}}]
    })

    describe('with default props', () => {
        const default_props = props

        it(`renders ${CHARACTER_1}`, () => {
            render(<CharactersSearchPanelPresenter {...default_props()} />)
        
            expect(screen.queryByTestId(CHARACTER_1)).toBeInTheDocument()
          })
        
        it('does not render an alert', () => {
            render(<CharactersSearchPanelPresenter {...default_props()} />)
        
            expect(screen.queryByTestId(ALERT_ERROR)).toBeNull()
            expect(screen.queryByTestId(ALERT_NO_CHARACTERS)).toBeNull()
        })

        it('renders the next and prev buttons', () => {
            render(<CharactersSearchPanelPresenter {...default_props()} />)
        
            expect(screen.queryByTestId(NEXT_BUTTON)).toBeInTheDocument()
            expect(screen.queryByTestId(PREV_BUTTON)).toBeInTheDocument()
        })

        it('does not render the reset button', () => {
            render(<CharactersSearchPanelPresenter {...default_props()} />)
        
            expect(screen.queryByTestId(RESET_BUTTON)).toBeNull()
        })

        it(`renders the ${FILTER_1} and not the ${FILTER_2}`, () => {
            render(<CharactersSearchPanelPresenter {...default_props()} />)
        
            expect(screen.queryByLabelText(FILTER_1)).toBeInTheDocument()
            expect(screen.queryByLabelText(FILTER_2)).toBeNull()
        })
    })

    describe('with no characters', () => {

        const props_with_no_characters = () => props({characters: []})
        it('renders just the no characters alert', () => {
            render(<CharactersSearchPanelPresenter {...props_with_no_characters()} />)
        
            expect(screen.queryByTestId(ALERT_NO_CHARACTERS)).toBeInTheDocument()
            expect(screen.queryByTestId(ALERT_ERROR)).toBeNull()
        })

        it(`does not render ${CHARACTER_1}`, () => {
            render(<CharactersSearchPanelPresenter {...props_with_no_characters()} />)
        
            expect(screen.queryByTestId(ALERT_NO_CHARACTERS)).toBeInTheDocument()
        })

        it('does not render next and prev buttons', () => {
            render(<CharactersSearchPanelPresenter {...props_with_no_characters()} />)
        
            expect(screen.queryByTestId(NEXT_BUTTON)).toBeNull()
            expect(screen.queryByTestId(PREV_BUTTON)).toBeNull()
        })
    })

    describe('when there is a server error', () => {
        it('renders just the alert error', () => {
            render(<CharactersSearchPanelPresenter {...props({error: "500"})} />)
        
            expect(screen.queryByTestId(ALERT_NO_CHARACTERS)).toBeNull()
            expect(screen.queryByTestId(ALERT_ERROR)).toBeInTheDocument()
        })
    })

    describe(`when given extra ${FILTER_2}`, () => {
        it('renders both filters', () => {
            const filters = [{defaultValue: "", label: FILTER_1, handler: () => {}}, {defaultValue: "", label: FILTER_2, handler: () => {}}]

            render(<CharactersSearchPanelPresenter {...props({filters})} />)
        
            expect(screen.queryByLabelText(FILTER_1)).toBeInTheDocument()
            expect(screen.queryByLabelText(FILTER_2)).toBeInTheDocument()
        })
    })

})
