const rank = new Map();

rank.set([1, 10], 'novice');
rank.set([11, 20], 'fan');
rank.set([21], 'movie buff');

const getRank = (watchedFilmCount = 0) => {
  for (const [key, value] of rank) {
    const [min, max = watchedFilmCount] = key;

    if (watchedFilmCount >= min && watchedFilmCount <= max) {
      return value;
    }
  }
};

export { getRank };
