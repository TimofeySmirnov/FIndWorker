import {
    ADMIN_ROUTE,
    EMPLOYEES_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    MY_VACANCIES_ROUTE, NOTIFICATION_ROUTE,
    RECALL_ROUTE,
    REGISTRATION_ROUTE,
    RESUME_ROUTE,
    RESUMES_ROUTE,
    VACANCIES_ROUTE,
    VACANCY_ROUTE,
    VIEW_APPLICANT_PROFILE_ROUTE,
    VIEW_EMPLOYER_PROFILE_ROUTE
} from "./utils/consts.js";

import vacancyPage from "./pages/vacancyPage.jsx";
import homePage from "./pages/homePage.jsx";
import employeesPage from "./pages/employeesPage.jsx";
import loginPage from "./pages/loginPage.jsx";
import employerProfilePage from "./pages/employerProfilePage.jsx";
import vacanciesPage from "./pages/vacanciesPage.jsx";
import adminPage from "./pages/adminPage.jsx";
import recallsPage from "./pages/recallsPage.jsx";
import resumePage from "./pages/resumePage.jsx";
import registrationPage from "./pages/registrationPage.jsx";
import applicantProfile from "./pages/applicantProfile.jsx";
import resumesByApplicant from "./pages/resumesByApplicant.jsx";
import myVacancies from "./pages/myVacancies.jsx";
import Notifications from "./pages/notifications.jsx";


export const publicRoutes = [
    {
        path: VACANCY_ROUTE,
        Element: vacancyPage,
    },
    {
        path: VACANCIES_ROUTE,
        Element: vacanciesPage,
    },
    {
        path: HOME_ROUTE,
        Element: homePage,
    },
    {
        path: EMPLOYEES_ROUTE,
        Element: employeesPage
    },
    {
        path: LOGIN_ROUTE,
        Element: loginPage,
    },
    {
        path: REGISTRATION_ROUTE,
        Element: registrationPage
    },
    {
        path: VIEW_EMPLOYER_PROFILE_ROUTE,
        Element: employerProfilePage,
    }
]

export const privateRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: adminPage,
        role: ['ADMIN']
    },
    {
        path: RECALL_ROUTE,
        Element: recallsPage,
        role: ['ADMIN', 'USER', 'EMPLOYEE']
    },
    {
        path: VIEW_APPLICANT_PROFILE_ROUTE,
        Element: applicantProfile,
        role: ['ADMIN', 'USER', 'EMPLOYEE']
    },
    {
        path: RESUME_ROUTE,
        Element: resumePage,
        role: ['ADMIN', 'USER', 'EMPLOYEE']
    },
    {
        path: RESUMES_ROUTE,
        Element: resumesByApplicant,
        role: ['ADMIN', 'USER']
    },
    {
        path: MY_VACANCIES_ROUTE,
        Element: myVacancies,
        role: ['EMPLOYEE', 'ADMIN']
    },
    {
        path: NOTIFICATION_ROUTE,
        Element: Notifications,
        role: ['EMPLOYEE', 'USER']
    }
]