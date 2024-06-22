import Fuse from 'fuse.js';

export const fuzzySearch = (countries: any[], searchTerm: string, key: string[]): any[] => {
    const options = {
        keys: key,
        threshold: 0.2, // Lower threshold for more strict matching
        distance: 100, // Maximum distance for a match
        minMatchCharLength: 2, // Minimum length of a match
        ignoreLocation: true, // Adjust the threshold as needed
    };

    const fuse = new Fuse(countries, options);
    return searchTerm ? fuse.search(searchTerm).map(result => result.item) : countries;
};
