import { render } from '../render';
import ProfileView from '../view/profile-view';

export default class ProfilePresenter {
  init(container) {
    render(new ProfileView(), container);
  }
}
