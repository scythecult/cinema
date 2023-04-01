const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const formatDuration = (rawTime) => {
  const SECONDS = rawTime * 60;
  let hours = Math.floor(SECONDS / 3600);
  let minutes = Math.floor((SECONDS - hours * 3600) / 60);

  hours = hours <= 0 ? '' : `${hours}h`;
  minutes = minutes <= 0 ? '' : `${minutes}m`;

  return `${hours} ${minutes}`;
};

const updateItem = (items = [], update = {}) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const sortFilmsBy = (films, propA, propB, limit = films.length) =>
  [...films]
    .sort(
      (filmA, filmB) => parseFloat(filmB[propA][propB], 10) - parseFloat(filmA[propA][propB], 10)
    )
    .slice(0, limit);

const formatDate = (rawDate) => new Date(rawDate).getFullYear();
export { getRandomInteger, formatDuration, formatDate, updateItem, sortFilmsBy };
