export const getDescription = (book)  => {
    const { description } = book || {};

    if (!description) {
        console.error('Missing description key.');
        return '';
    }


        switch (description.type) {
            case '/type/text':
                return description.value || '';
            default:
                console.error('Unsupported description type:', description.type);
                return '';
    }
}



export const getCoverURL = (cover_id, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${cover_id}-${size}.jpg`;
}