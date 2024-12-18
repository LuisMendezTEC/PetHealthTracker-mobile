import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { I18nextProvider } from 'react-i18next';
import { Redirect, Route } from 'react-router-dom';
import '../Tailwind.css';
import './App.css';
import i18n from './Config/i18n';
import { AuthProvider } from './Context/LoginContext';
import { ThemeProvider } from './Context/ThemeContext';
import Appointments from './pages/Appointments';
import AppointmentsAdd from './pages/AppointmentsAdd';
import AppointmentsEdit from './pages/AppointmentsEdit';
import Dashboard from './pages/Dashboard';
import Diagnostics from './pages/Diagnostics';
import Login from './pages/Login';
import PetsAdd from './pages/PetAdd';
import Pets from './pages/Pets';
import PetsEdit from './pages/PetsEdit';
import Register from './pages/Register';
import Settings from './pages/Settings';
import VaccinePets from './pages/VaccinePets';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const id_dueño = localStorage.getItem('client_id');
  const id_mascota = localStorage.getItem('id_mascota');

  return (
    <IonApp>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <AuthProvider>
                  <Route path="/PetAdd" component={PetsAdd} exact />
                  <Route path="/Dashboard" component={Dashboard} exact />
                  <Route path="/Login" component={Login} exact />
                  <Route path="/settings" component={Settings} exact />
                  <Route path="/Register" component={Register} exact />
                  <Route path="/Pets" component={Pets} exact />
                  <Route path="/Appointments" component={Appointments} exact />
                  <Route path="/AppointmentsAdd" component={AppointmentsAdd} exact />
                  <Route path="/Diagnostics" component={Diagnostics} exact />
                  <Route path="/VaccinePets" component={VaccinePets} exact />
                  <Route path="/citas/:id/editar" component={AppointmentsEdit} exact />
                  <Route path="/mascotas/:id/editar" component={PetsEdit} exact />
                  <Redirect exact from="/" to={id_dueño ? '/Dashboard' : '/Login'} />
                </AuthProvider>
              </IonRouterOutlet>
            </IonTabs>
          </IonReactRouter>
        </I18nextProvider>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;
