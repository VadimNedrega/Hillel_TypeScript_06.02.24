{
    interface Film {
        title: string;
        releaseYear: number;
        rating: number;
        awards: string[];
    }

    interface Category {
        name: string;
        films: Film[];
    }

    type MatchFilter = { filter: string };
    type RangeFilter = { filter: number; filterTo: number };
    type ValuesSearchFilter = { values: string[] };

    type Filter = MatchFilter | RangeFilter | ValuesSearchFilter;

    type FiltersState = {
        searchValue?: string;
        filters?: Filter[];
    };

    class FilmList {
        constructor(public films: Film[], public filtersState: FiltersState = {}) {}

        applySearchValue(value: string) {}

        applyFilters(filters: Filter[]) {}
    }

    class CategoryList {
        constructor(public categories: Category[], public filtersState: FiltersState = {}) {}

        applySearchValue(value: string) {}

        applyFilters(filters: Filter[]) {}
    }
}