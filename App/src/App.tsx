import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import '../Tailwind.css';
import { AuthProvider } from './Context/LoginContext';
import './images/10143477.jpg';
import Appointments from './pages/Appointments';
import AppointmentsEdit from './pages/AppointmentsEdit';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PetsAdd from './pages/PetAdd';
import Pets from './pages/Pets';
import PetsEdit from './pages/PetsEdit';
import Register from './pages/Register';

let id_dueño = localStorage.getItem('client_id');
let id_cita = localStorage.getItem('id_cita');
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

const App: React.FC = () => (
  <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <AuthProvider>
              <Route path="/PetAdd" component={PetsAdd} exact />
              <Route path="/Dashboard" component={Dashboard} exact />
              <Route path="/Login" component={Login} exact />
              <Route path="/Home" component={Home} exact />
              <Route path="/Register" component={Register} exact />
              <Route path="/Pets" component={Pets} exact />
              <Route path="/Appointments" component={Appointments} exact />
              <Route path={`/citas/${id_cita}/editar`} component={AppointmentsEdit} exact />
              {id_dueño ? (
            <Route path={`/mascotas/${id_dueño}/editar`} component={PetsEdit} exact />
          ) : (
            <Redirect to="/Login" />
          )}
          <Redirect exact from="/" to="/Login" />
            </AuthProvider>
          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
  </IonApp>
);

export default App;
