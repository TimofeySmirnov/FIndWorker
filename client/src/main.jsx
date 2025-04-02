import {createContext, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserStore from "./store/userStore.js";
import VacancyStore from "./store/vacancyStore.js";
import PositionStore from "./store/positionStore.js";
import './styles/main.css'
import EmployeeStore from "./store/employeeStore.js";
import ApplicantStore from "./store/applicantStore.js";
import RecallStore from "./store/recallStore.js";
import ResumeStore from "./store/resumeStore.js";
import FeedbackStore from "./store/feedbackStore.js";
import FiltersStore from "./store/filtersStore.js";
import AdminStore from "./store/adminStore.js";
import NotificationStore from "./store/notificationStore.js";


export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Context.Provider value={{
          user: new UserStore(),
          vacancy: new VacancyStore(),
          positions: new PositionStore(),
          employees: new EmployeeStore(),
          applicant: new ApplicantStore(),
          recalls: new RecallStore(),
          resumes: new ResumeStore(),
          feedbacks: new FeedbackStore(),
          filters: new FiltersStore(),
          admin: new AdminStore(),
          notifications: new NotificationStore(),
      }}>

          <App />
      </Context.Provider>
  </StrictMode>
)
