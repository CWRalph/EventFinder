export const getFuzzyFindQuery = (query:string, fields:string|string[]) => ({
    $text:{
        $search: {
            text: {
                query: query,
                path: fields,
                fuzzy: {}
            }
        }
    }
});