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

const formatDate = (rawDate) => new Date(rawDate).getFullYear();

const sortByRating = (filmA = {}, filmB = {}) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const sortByReleaseDate = (filmA = {}, filmB = {}) =>
  dayjs(filmB.filmInfo.release.date) - dayjs(filmA.filmInfo.release.date);

export { humanizeDate, humanizeCommentDate, formatDate, formatDuration, sortByRating, sortByReleaseDate };
