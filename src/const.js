const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite',
};

const Mode = {
  DEFAULT: 'default',
  POPUP: 'popup',
};

const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

const UserActions = {
  UPDATE: 'UPDATE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { EMOTIONS, SortType, UserActions, UpdateType, FilterType, Mode };
