import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling
import { supabase } from './supabaseClient';

interface Cliente {
  id_cliente: number;
  nombre_usuario: string;
  correo: string;
  direccion: string;
}

interface Mascota {
  id_mascota: number;
  nombre_mascota: string;
  tipo: string;
  id_cliente: number;
}

interface Funcionario {
  id_funcionario: number;
  nombre: string;
  puesto: string;
  correo: string;
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchClientes = async () => {
    const { data, error } = await supabase.from('Clientes').select('*');
    console.log(data);
    if (error) console.error('Error fetching clientes:', error);
    else if (data) setClientes(data);
  };

  const fetchMascotas = async () => {
    const { data, error } = await supabase.from('Mascotas').select('*');
    console.log(data);
    if (error) console.error('Error fetching mascotas:', error);
    else if (data) setMascotas(data);
  };

  const fetchFuncionarios = async () => {
    const { data, error } = await supabase.from('Funcionario').select('*');
    console.log(data);
    if (error) console.error('Error fetching funcionarios:', error);
    else if (data) setFuncionarios(data);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchClientes(), fetchMascotas(), fetchFuncionarios()])
      .then(() => setLoading(false))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Gestión de Datos</h1>
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <Switch>
            <Route path="/" exact>
              <section>
                <h2>Clientes</h2>
                <ul>
                  {clientes.map((cliente) => (
                    <li key={cliente.id_cliente}>
                      {cliente.nombre_usuario} - {cliente.correo} - {cliente.direccion}
                    </li>
                  ))}
                </ul>
              </section>
            </Route>
            <Route path="/mascotas">
              <section>
                <h2>Mascotas</h2>
                <ul>
                  {mascotas.map((mascota) => (
                    <li key={mascota.id_mascota}>
                      {mascota.nombre_mascota} - {mascota.tipo} - ID Cliente: {mascota.id_cliente}
                    </li>
                  ))}
                </ul>
              </section>
            </Route>
            <Route path="/funcionarios">
              <section>
                <h2>Funcionarios</h2>
                <ul>
                  {funcionarios.map((funcionario) => (
                    <li key={funcionario.id_funcionario}>
                      {funcionario.nombre} - {funcionario.puesto} - {funcionario.correo}
                    </li>
                  ))}
                </ul>
              </section>
            </Route>
          </Switch>
        )}
        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/">Clientes</Link>
            </li>
            <li>
              <Link to="/mascotas">Mascotas</Link>
            </li>
            <li>
              <Link to="/funcionarios">Funcionarios</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
