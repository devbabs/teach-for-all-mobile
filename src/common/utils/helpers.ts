export const createSlugFromString = (str: string) => {
    return str.toLowerCase().replace(/ /g, '_').replace(/[^\w_]+/g, '');
}