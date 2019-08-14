export const formatDateString = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-pl', {
    //weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
export const formatDateStringShort = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-pl', {
    //weekday: 'short',
    day: 'numeric',
    month: 'numeric'
    //year: 'numeric'
  });
};
