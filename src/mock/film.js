import { getRandomInteger } from '../utils/common';
import { COMMENTS } from './comments';

const filmInfos = [
  {
    title: 'A Little Pony Without The Carpet',
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
    poster: './images/posters/popeye-meets-sinbad.png',
    ageRating: 0,
    director: 'Tom Ford',
    writers: ['Takeshi Kitano'],
    actors: ['Morgan Freeman'],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland',
    },
    runtime: 77,
    genre: ['Comedy'],
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  },
  {
    title: 'The Dance of Life',
    alternativeTitle: 'The Dance of Life',
    totalRating: 8.3,
    poster: './images/posters/the-dance-of-life.jpg',
    ageRating: 16,
    director: 'Ford Tom',
    writers: ['Takeshi Kitano', 'Morgan Freeman'],
    actors: ['Morgan Freeman', 'Musical'],
    release: {
      date: '1966-01-11T00:00:00.000Z',
      releaseCountry: 'England',
    },
    runtime: 120,
    genre: ['Musical'],
    description: 'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
  },
  {
    title: 'Sagebrush Trail',
    alternativeTitle: 'Sagebrush Trail',
    totalRating: 3.2,
    poster: './images/posters/sagebrush-trail.jpg',
    ageRating: 14,
    director: 'Morgan Freeman',
    writers: ['Takeshi Kitano', 'Morgan Freeman'],
    actors: ['Morgan Freeman', 'Musical', 'Takeshi Kitano'],
    release: {
      date: '1954-02-11T00:00:00.000Z',
      releaseCountry: 'Russian',
    },
    runtime: 100,
    genre: ['Western'],
    description: 'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brants narrow escap…',
  },
  {
    title: 'Santa Claus Conquers the Martians',
    alternativeTitle: 'Santa Claus Conquers the Martians',
    totalRating: 2.3,
    poster: './images/posters/santa-claus-conquers-the-martians.jpg',
    ageRating: 14,
    director: 'Morgan Freeman',
    writers: ['Takeshi Kitano', 'Morgan Freeman'],
    actors: ['Morgan Freeman', 'Musical', 'Takeshi Kitano'],
    release: {
      date: '2023-05-11T00:00:00.000Z',
      releaseCountry: 'Moldova',
    },
    runtime: 14,
    genre: ['Comedy'],
    description: 'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
  },
];

const generateUserDetails = () => ({
  watchlist: Boolean(getRandomInteger(0, 1)),
  alreadyWatched: Boolean(getRandomInteger(0, 1)),
  watchingDate: '2019-04-12T16:12:32.554Z',
  favorite: Boolean(getRandomInteger(0, 1)),
});

const generateCommentIds = () => COMMENTS.map((comment) => comment.id).slice(0, getRandomInteger(0, COMMENTS.length));

const makeIdGenerator = () => {
  let count = 0;

  return () => count++;
};

const generateId = makeIdGenerator();

const generateFilmInfo = () => {
  const filmInfo = filmInfos[getRandomInteger(0, filmInfos.length - 1)];
  const commentIds = generateCommentIds();
  const userDetails = generateUserDetails();
  const id = generateId();

  return {
    id,
    commentIds,
    filmInfo,
    userDetails,
  };
};

export { generateFilmInfo };
