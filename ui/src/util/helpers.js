export function convertOptionstoListHelper(data) {
    const options = data.map(item => item.options);
    return options;
}

export function formatHeader(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}