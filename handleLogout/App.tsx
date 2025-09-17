import React, { useState } from 'react';
import './App.css';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyInterest: string;
}

interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  method: 'efectivo' | 'transferencia' | 'cheque';
  status: 'pagado' | 'pendiente' | 'vencido';
  description: string;
}

interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  service: string;
  status: 'programada' | 'completada' | 'cancelada';
  notes: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      clientId: '1',
      clientName: 'Juana Martel',
      amount: 25000.00,
      date: '20/08/2025',
      method: 'transferencia',
      status: 'pagado',
      description: 'Pago inicial propiedad'
    }
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientId: '1',
      clientName: 'Daniel Mejia',
      date: '27/08/2025',
      time: '10:00 AM',
      service: 'Visita de propiedad',
      status: 'programada',
      notes: 'Primera visita'
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Jose Raudales',
      date: '29/08/2025',
      time: '03:30 PM',
      service: 'Visita de propiedad',
      status: 'programada',
      notes: 'Segunda visita'
    }
  ]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    propertyInterest: '',
    paymentAmount: '',
    paymentMethod: 'efectivo' as 'efectivo' | 'transferencia' | 'cheque',
    paymentDescription: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentService: '',
    appointmentNotes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email: formData.email
      };
      setUser(mockUser);
      setCurrentScreen('dashboard');
      setFormData(prev => ({ ...prev, email: '', password: '' }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email
      };
      setUser(newUser);
      setCurrentScreen('dashboard');
      setFormData(prev => ({ ...prev, name: '', email: '', password: '' }));
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientName && formData.clientEmail && formData.clientPhone) {
      const newClient: Client = {
        id: Date.now().toString(),
        name: formData.clientName,
        email: formData.clientEmail,
        phone: formData.clientPhone,
        address: formData.clientAddress,
        propertyInterest: formData.propertyInterest
      };
      setClients([...clients, newClient]);
      setFormData(prev => ({ 
        ...prev, 
        clientName: '', 
        clientEmail: '', 
        clientPhone: '', 
        clientAddress: '', 
        propertyInterest: '' 
      }));
      alert('Cliente agregado exitosamente');
    }
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentAmount && formData.paymentDescription) {
      const newPayment: Payment = {
        id: Date.now().toString(),
        clientId: '1',
        clientName: 'Cliente Demo',
        amount: parseFloat(formData.paymentAmount),
        date: new Date().toLocaleDateString('es-HN'),
        method: formData.paymentMethod,
        status: 'pagado',
        description: formData.paymentDescription
      };
      setPayments([...payments, newPayment]);
      setFormData(prev => ({ ...prev, paymentAmount: '', paymentDescription: '' }));
      alert('Pago registrado exitosamente');
    }
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.appointmentDate && formData.appointmentTime && formData.appointmentService) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        clientId: '1',
        clientName: 'Cliente Demo',
        date: formData.appointmentDate,
        time: formData.appointmentTime,
        service: formData.appointmentService,
        status: 'programada',
        notes: formData.appointmentNotes
      };
      setAppointments([...appointments, newAppointment]);
      setFormData(prev => ({ 
        ...prev, 
        appointmentDate: '', 
        appointmentTime: '', 
        appointmentService: '', 
        appointmentNotes: '' 
      }));
      alert('Cita programada exitosamente');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setCurrentScreen('login');
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const deletePayment = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const editAppointment = (id: string, status: 'programada' | 'completada' | 'cancelada') => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status } : a
    ));
  };

  // Screen Components
  const LoginScreen = () => (
    <div className="screen">
      <div className="logo">
        <span className="logo-icon">🏢</span>
        <h1>Robles de la Laguna</h1>
        <p>Gestión de venta de Propiedades</p>
      </div>
      <h2>Iniciar Sesión</h2>
      <form className="form" onSubmit={handleLogin}>
        <input 
          type="email" 
          name="email"
          placeholder="Correo electrónico" 
          className="input" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input 
          type="password" 
          name="password"
          placeholder="Contraseña" 
          className="input" 
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn primary">Iniciar Sesión</button>
        <button type="button" className="btn secondary" onClick={() => setCurrentScreen('register')}>
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </div>
  );

  const RegisterScreen = () => (
    <div className="screen">
      <h2>Registro</h2>
      <form className="form" onSubmit={handleRegister}>
        <input 
          type="text" 
          name="name"
          placeholder="Nombre completo" 
          className="input" 
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input 
          type="email" 
          name="email"
          placeholder="Correo electrónico" 
          className="input" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input 
          type="password" 
          name="password"
          placeholder="Contraseña" 
          className="input" 
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn primary">Crear Cuenta</button>
        <button type="button" className="btn secondary" onClick={() => setCurrentScreen('login')}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </div>
  );

  const DashboardScreen = () => (
    <div className="screen dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Citas Próximas</h3>
            <button className="btn-link" onClick={() => setCurrentScreen('appointments')}>Ver todo</button>
          </div>
          <div className="appointments-preview">
            {appointments.filter(a => a.status === 'programada').slice(0, 2).map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <h4>{appointment.clientName}</h4>
                <p>{appointment.date} a las {appointment.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Pagos Recientes</h3>
            <button className="btn-link" onClick={() => setCurrentScreen('payments')}>Ver todo</button>
          </div>
          <div className="payments-preview">
            {payments.slice(0, 2).map(payment => (
              <div key={payment.id} className="payment-card">
                <h4>{payment.clientName}</h4>
                <p>L {payment.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })} - {payment.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ClientsScreen = () => (
    <div className="screen">
      <h2>Gestión de Clientes</h2>
      <form className="form" onSubmit={handleAddClient} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          name="clientName"
          placeholder="Nombre del cliente" 
          className="input" 
          value={formData.clientName}
          onChange={handleInputChange}
          required
        />
        <input 
          type="email" 
          name="clientEmail"
          placeholder="Correo electrónico" 
          className="input" 
          value={formData.clientEmail}
          onChange={handleInputChange}
          required
        />
        <input 
          type="tel" 
          name="clientPhone"
          placeholder="Teléfono" 
          className="input" 
          value={formData.clientPhone}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          name="clientAddress"
          placeholder="Dirección" 
          className="input" 
          value={formData.clientAddress}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name="propertyInterest"
          placeholder="Interés en propiedad" 
          className="input" 
          value={formData.propertyInterest}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn primary">Agregar Cliente</button>
      </form>
      
      <div>
        <h3>Lista de Clientes:</h3>
        {clients.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          clients.map(client => (
            <div key={client.id} className="card" style={{ marginTop: '1rem' }}>
              <h4>{client.name}</h4>
              <p>📧 {client.email}</p>
              <p>📞 {client.phone}</p>
              {client.address && <p>🏠 {client.address}</p>}
              {client.propertyInterest && <p>🏢 Interés: {client.propertyInterest}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const PaymentsScreen = () => (
    <div className="screen">
      <div className="screen-header">
        <h2>Pagos</h2>
      </div>
      <form className="form" onSubmit={handleAddPayment} style={{ marginBottom: '2rem' }}>
        <input
          type="number"
          name="paymentAmount"
          placeholder="Monto"
          className="input"
          value={formData.paymentAmount}
          onChange={handleInputChange}
          required
        />
        <select
          name="paymentMethod"
          className="input"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="cheque">Cheque</option>
        </select>
        <input
          type="text"
          name="paymentDescription"
          placeholder="Descripción"
          className="input"
          value={formData.paymentDescription}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn primary">Registrar Pago</button>
      </form>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>CLIENTE</th>
              <th>MONTO</th>
              <th>FECHA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.clientName}</td>
                <td>L {payment.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</td>
                <td>{payment.date}</td>
                <td>
                  <button 
                    className="btn-action delete"
                    onClick={() => deletePayment(payment.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AppointmentsScreen = () => (
    <div className="screen">
      <div className="screen-header">
        <h2>Citas</h2>
      </div>
      <form className="form" onSubmit={handleAddAppointment} style={{ marginBottom: '2rem' }}>
        <input
          type="date"
          name="appointmentDate"
          className="input"
          value={formData.appointmentDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="appointmentTime"
          className="input"
          value={formData.appointmentTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="appointmentService"
          placeholder="Servicio"
          className="input"
          value={formData.appointmentService}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="appointmentNotes"
          placeholder="Notas"
          className="input"
          value={formData.appointmentNotes}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="btn primary">Agendar Cita</button>
      </form>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>CLIENTE</th>
              <th>FECHA</th>
              <th>HORA</th>
              <th>NOTAS</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.clientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.notes}</td>
                <td>
                  <button 
                    className="btn-action edit"
                    onClick={() => editAppointment(appointment.id, 'completada')}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-action delete"
                    onClick={() => editAppointment(appointment.id, 'cancelada')}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ReportsScreen = () => (
    <div className="screen">
      <h2>Reportes</h2>
      <div className="reports-grid">
        <div className="report-section">
          <h3>Citas Próximas</h3>
          <div className="report-cards">
            {appointments.filter(a => a.status === 'programada').map(appointment => (
              <div key={appointment.id} className="report-card">
                <h4>{appointment.clientName}</h4>
                <p>Fecha: {appointment.date}, Hora: {appointment.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <h3>Pagos por Clientes</h3>
          <div className="report-cards">
            {payments.map(payment => (
              <div key={payment.id} className="report-card">
                <h4>Cliente: {payment.clientName}</h4>
                <p>Total pagado: L {payment.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LogoutConfirmScreen = () => (
    <div className="screen">
      <div className="logo">
        <span className="logo-icon">🚪</span>
        <h1>Cerrar Sesión</h1>
        <p>¿Estás seguro que deseas cerrar sesión?</p>
      </div>
      
      <div className="logout-info">
        <div className="user-info-card">
          <h3>Usuario actual:</h3>
          <p><strong>{user?.name}</strong></p>
          <p>{user?.email}</p>
        </div>
        
        <div className="session-info">
          <p>Al cerrar sesión:</p>
          <ul>
            <li>Se cerrará tu sesión actual</li>
            <li>Regresarás a la pantalla de inicio</li>
            <li>Deberás iniciar sesión nuevamente para acceder</li>
          </ul>
        </div>
      </div>

      <div className="logout-actions">
        <button className="btn primary" onClick={confirmLogout}>
          🚪 Sí, cerrar sesión
        </button>
        <button className="btn secondary" onClick={cancelLogout}>
          ← Regresar al dashboard
        </button>
      </div>
    </div>
  );

  const renderScreen = () => {
    if (showLogoutConfirm) {
      return <LogoutConfirmScreen />;
    }

    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'clients':
        return <ClientsScreen />;
      case 'payments':
        return <PaymentsScreen />;
      case 'appointments':
        return <AppointmentsScreen />;
      case 'reports':
        return <ReportsScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="app">
      {user && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>ROBLES DE LA LAGUNA</h1>
            <p>Gestión de venta de Propiedades</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={currentScreen === 'dashboard' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentScreen('dashboard')}
            >
              🏠 Dashboard
            </button>
            <button 
              className={currentScreen === 'clients' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentScreen('clients')}
            >
              👥 Clientes
            </button>
            <button 
              className={currentScreen === 'appointments' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentScreen('appointments')}
            >
              📅 Citas
            </button>
            <button 
              className={currentScreen === 'payments' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentScreen('payments')}
            >
              💰 Pagos
            </button>
            <button 
              className={currentScreen === 'reports' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentScreen('reports')}
            >
              📊 Reportes
            </button>
            <button 
              className="nav-item logout"
              onClick={handleLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </nav>
        </aside>
      )}
      
      <main className={user ? "main-content with-sidebar" : "main-content"}>
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
