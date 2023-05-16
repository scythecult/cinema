import { render } from '../framework/render';
import ProfileView from '../view/profile-view';

export default class ProfilePresenter {
  #profileContainer = null;

  constructor({ container }) {
    this.#profileContainer = container;
  }

  init() {
    render(new ProfileView(), this.#profileContainer);
  }
}
