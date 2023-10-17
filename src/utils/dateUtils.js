export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export function getYearFromDate(dateString) {
    const options = { year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}