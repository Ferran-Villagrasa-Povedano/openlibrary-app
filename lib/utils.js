export const getId = (item) => {
    const { key } = item || {};
    if (!key) return null;
    const parts = key.split('/');
    return parts[parts.length - 1]; // Returns the last part after the last '/'
}

export const getCoverURL = (cover_id, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${cover_id}-${size}.jpg`;
}