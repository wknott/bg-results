export const formatDateString = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    //weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
