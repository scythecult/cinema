import AbstractView from '../framework/view/abstract-view';
import { getRank } from '../utils/profile';

const createProfileTemplate = (alreadyWatchedFilms) => {
  const userRank = getRank(alreadyWatchedFilms);

  return `<section class="header__profile profile">
<p class="profile__rating">${userRank}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class ProfileView extends AbstractView {
  #alreadyWatchedFilms = null;

  constructor(alreadyWatchedFilms = []) {
    super();
    this.#alreadyWatchedFilms = alreadyWatchedFilms;
  }

  get template() {
    return createProfileTemplate(this.#alreadyWatchedFilms);
  }
}
