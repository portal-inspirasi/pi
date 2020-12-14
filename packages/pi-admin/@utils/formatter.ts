export const dateFormatter = (date: Date): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('id-ID', options);
};

export const timeFormatter = (date: Date): string => {
  const newDate = new Date(date);
  return `${
    newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
  }:${
    newDate.getMinutes() < 10
      ? '0' + newDate.getMinutes()
      : newDate.getMinutes()
  }`;
};

export const getCurrentDateTime = (): string => {
  const dateNow = new Date();
  return `${timeFormatter(dateNow)}:${
    dateNow.getSeconds() < 10
      ? '0' + dateNow.getSeconds()
      : dateNow.getSeconds()
  } - ${dateFormatter(dateNow)}`;
};
