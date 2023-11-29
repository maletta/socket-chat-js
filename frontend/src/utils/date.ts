function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0 em JavaScript
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export { formatDate };
