export function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // +1 because month is 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
