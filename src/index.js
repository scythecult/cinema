// import FilmsModel from './model/film-model';
// import FilmsPresenter from './presenter/films-presenter';
import NavModel from './model/navigarion-model';
import NavigationPresenter from './presenter/navigation-presenter';
// import PopupPresenter from './presenter/popup-presenter';
import ProfilePresenter from './presenter/profile-presenter';
// import SortPresenter from './presenter/sort-presenter';
// import StatsPresenter from './presenter/stats-presenter';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
// const footerContainer = document.querySelector('.footer');

// models
// const filmsModel = new FilmsModel();
const navModel = new NavModel();

// views

// presenters
const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter(navModel);
// const sortPresenter = new SortPresenter();
// const filmsPresenter = new FilmsPresenter();
// const statsPresenter = new StatsPresenter();
// const popupPresenter = new PopupPresenter();

profilePresenter.init(profileContainer);
navigationPresenter.init(mainContainer);
// sortPresenter.init(mainContainer);
// filmsPresenter.init(mainContainer, filmsModel);
// statsPresenter.init(footerContainer);
// popupPresenter.init(footerContainer, filmsModel, 2);
