export const getFuzzyFindQuery = (query:string, fields:string|string[]) => [
    {
        $search: {
            text: {
                query: query,
                path: fields,
                fuzzy: {}
            }
        }
    }
]