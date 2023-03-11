import AbstractView from '../framework/view/abstract-view';

const createDropdownTemplate = () => '<div class="dropdown"></div>';

export default class DropdownView extends AbstractView {
  get template() {
    return createDropdownTemplate();
  }
}
