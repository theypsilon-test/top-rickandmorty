import { ApolloError } from '@apollo/client';
import { intOr, toSingleString } from 'modules/Utils';

export interface CharacterDto {
    name: string; status?: string; species?: string; type?: string; gender?: string; image: string;
}

export interface CharactersPageDto {
    characters: {
        info: {
            count: number;
            next: number;
            prev: number;
        };
        results: CharacterSmallDto[];
    };
}

export interface CharacterSmallDto {
    id: string; name: string; image: string;
}

export interface CharactersSearchCommand {
    page: number; filterName: string; filterStatus: string; filterSpecies: string; filterType: string; filterGender: string;
}

export const buildSearchCharacterCommand = (query: {[key: string]: string | string[] | undefined}): CharactersSearchCommand => {
    return {
        page: intOr(query.page, 1),
        filterName: toSingleString(query.filterName ?? ""),
        filterSpecies: toSingleString(query.filterSpecies ?? ""),
        filterStatus: toSingleString(query.filterStatus ?? ""),
        filterType: toSingleString(query.filterType ?? ""),
        filterGender: toSingleString(query.filterGender ?? ""),
    }
}


export interface CharactersSearchResultDto {
    error?: ApolloError; data?: CharactersPageDto; previousData?: CharactersPageDto;
}
