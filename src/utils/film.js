import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatDuration = (rawTime) => {
  const SECONDS = rawTime * 60;
  let hours = Math.floor(SECONDS / 3600);
  let minutes = Math.floor((SECONDS - hours * 3600) / 60);

  hours = hours <= 0 ? '' : `${hours}h`;
  minutes = minutes <= 0 ? '' : `${minutes}m`;

  return `${hours} ${minutes}`;
};

const humanizeDate = (rawDate = '', format = 'DD MMMM YYYY') => dayjs(rawDate).format(format);

const humanizeCommentDate = (rawDate = '') => {
  const format = 'YYYY/MM/DD HH:MM';
  const currentTime = humanizeDate(rawDate, format);

  return dayjs().from(currentTime);
};

const truncate = (description = '', limit = 140) =>
  description.length > limit ? `${description.slice(0, limit - 1)}…` : description;

const formatDate = (rawDate) => new Date(rawDate).getFullYear();

const filterByWatched = (films) => films.filter((film) => film.userDetails.alreadyWatched);

const sortByRating = (filmA = {}, filmB = {}) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const sortByCommentCount = (filmA = {}, filmB = {}) => filmB.commentIds.length - filmA.commentIds.length;

const sortByReleaseDate = (filmA = {}, filmB = {}) =>
  dayjs(filmB.filmInfo.release.date) - dayjs(filmA.filmInfo.release.date);

export {
  humanizeDate,
  humanizeCommentDate,
  formatDate,
  formatDuration,
  sortByRating,
  sortByReleaseDate,
  sortByCommentCount,
  filterByWatched,
  truncate,
};
