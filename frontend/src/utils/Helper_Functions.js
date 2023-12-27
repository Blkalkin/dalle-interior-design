export const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
  
    const timeDifference = now - date;
    
    if (timeDifference < 60 * 60 * 1000) {
      const minutes = Math.floor(timeDifference / (1000 * 60));
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  
  
    if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  

    if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  
 
    if (timeDifference < 4 * 7 * 24 * 60 * 60 * 1000) {
      const weeksDifference = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
      return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
    }
  
  
    const yearsDifference = now.getFullYear() - date.getFullYear();
    const monthsDifference = now.getMonth() - date.getMonth() + yearsDifference * 12;
  
 
    return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
  };
  

export function formatDateString(dateString) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
}

export const capitalizeFirstLetter = str => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1); 
}