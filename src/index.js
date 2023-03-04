// import FilmsModel from './model/film-model';
// import FilmsPresenter from './presenter/films-presenter';
import FiltersModel from './model/filter-model';
import NavModel from './model/navigarion-model';
import FiltersPresenter from './presenter/filters-presenter';
// import FiltersPresenter from './presenter/filters-presenter';
import NavigationPresenter from './presenter/navigation-presenter';
// import PopupPresenter from './presenter/popup-presenter';
import ProfilePresenter from './presenter/profile-presenter';

// import StatsPresenter from './presenter/stats-presenter';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
// const footerContainer = document.querySelector('.footer');

// models
// const filmsModel = new FilmsModel();
const navModel = new NavModel();
const filtersModel = new FiltersModel();
// views

// presenters
const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter(navModel);
const filtersPresenter = new FiltersPresenter(filtersModel);
// const sortPresenter = new SortPresenter();
// const filmsPresenter = new FilmsPresenter();
// const statsPresenter = new StatsPresenter();
// const popupPresenter = new PopupPresenter();

profilePresenter.init(profileContainer);
navigationPresenter.init(mainContainer);
filtersPresenter.init(mainContainer);
// sortPresenter.init(mainContainer);
// filmsPresenter.init(mainContainer, filmsModel);
// statsPresenter.init(footerContainer);
// popupPresenter.init(footerContainer, filmsModel, 2);
