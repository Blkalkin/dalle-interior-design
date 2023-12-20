export const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
  
    const timeDifference = now - date;
  
    // If the time difference is less than one day (in milliseconds)
    if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours} hours ago`;
    }
  
    // If the time difference is one day or more
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear());
  
    return `${month}-${day}-${year}`;
}