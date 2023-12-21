export const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
  
    const timeDifference = now - date;
    
    if (timeDifference < 60 * 60 * 1000) {
      const minutes = Math.floor(timeDifference / (1000 * 60));
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  
    // If the time difference is less than 48 hours (2 days), display hours
    if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  
    // If the time difference is two days or more but less than 7 days, display days
    if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  
    // If the time difference is one week or more but less than 4 weeks, display weeks
    if (timeDifference < 4 * 7 * 24 * 60 * 60 * 1000) {
      const weeksDifference = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
      return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
    }
  
    // Calculate the difference in years and months
    const yearsDifference = now.getFullYear() - date.getFullYear();
    const monthsDifference = now.getMonth() - date.getMonth() + yearsDifference * 12;
  
    // If the time difference is one month or more, display months
    return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
  };
  