export const formatDateToYMD = (dateObj) => {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDateToYMD(d);
};

export const getTodayDate = () => {
  return formatDateToYMD(new Date());
};
