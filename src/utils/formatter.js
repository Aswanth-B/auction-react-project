export const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  }
 // Output: 2024-10-25T12:03
  