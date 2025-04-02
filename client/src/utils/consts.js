//Работодатель
export const EMPLOYEES_ROUTE = '/employees' //Получение всех, поиск
export const VIEW_EMPLOYER_PROFILE_ROUTE = '/view-profile-employer/:id'// Профиль конкретного работодателя и его элементов упралвения в зависимости от роли

//Регистрация
export const REGISTRATION_ROUTE = '/registration'

export const RESUMES_ROUTE = '/my-resumes'
//Отлики на вакансию
export const RECALL_ROUTE = '/recalls/:id'

export const NOTIFICATION_ROUTE = '/notification'
//Резюме
export const RESUME_ROUTE = '/resume/:id'

//Соискатель
export const VIEW_APPLICANT_PROFILE_ROUTE = '/view-profile-applicant/:id'

//Главная
export const HOME_ROUTE = '/'//главная с топом вакансий, профессий и работодателей

//вакансии
export const MY_VACANCIES_ROUTE = '/my-vacancies'
export const VACANCY_ROUTE = '/vacancy/:id'//получение по id и элементы управления, в зависимости от роли
export const VACANCIES_ROUTE = '/vacancies'//список вакансий

//Администрирование
export const ADMIN_ROUTE = '/admin' //Главная страница админа с CRUD фильтров, получением всех соискателей, работодателей, отзывов.


//Вход в систему, выбирается под кем будет осуществляться заход
export const LOGIN_ROUTE = '/login'


