import dayjs from 'dayjs';

const formatDuration = (rawTime) => {
  const SECONDS = rawTime * 60;
  let hours = Math.floor(SECONDS / 3600);
  let minutes = Math.floor((SECONDS - hours * 3600) / 60);

  hours = hours <= 0 ? '' : `${hours}h`;
  minutes = minutes <= 0 ? '' : `${minutes}m`;

  return `${hours} ${minutes}`;
};

const humanizeReleaseDate = (rawDate = '') => dayjs(rawDate).format('DD MMMM YYYY');

const formatDate = (rawDate) => new Date(rawDate).getFullYear();

const sortByRating = (filmA = {}, filmB = {}) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const sortByReleaseDate = (filmA = {}, filmB = {}) => dayjs(filmB.filmInfo.release.date) - dayjs(filmA.filmInfo.release.date);

export { humanizeReleaseDate, formatDate, formatDuration, sortByRating, sortByReleaseDate };
