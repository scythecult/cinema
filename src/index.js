import FilmsPresenter from './presenter/films-presenter';
import NavigationPresenter from './presenter/navigation-presenter';
import PopupPresenter from './presenter/popup-presenter';
import ProfilePresenter from './presenter/profile-presenter';
import SortPresenter from './presenter/sort-presenter';
import StatsPresenter from './presenter/stats-presenter';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// views

// presenters
const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter();
const sortPresenter = new SortPresenter();
const filmsPresenter = new FilmsPresenter();
const statsPresenter = new StatsPresenter();
const popupPresenter = new PopupPresenter();

profilePresenter.init(profileContainer);
navigationPresenter.init(mainContainer);
sortPresenter.init(mainContainer);
filmsPresenter.init(mainContainer);
statsPresenter.init(footerContainer);
popupPresenter.init(footerContainer);
