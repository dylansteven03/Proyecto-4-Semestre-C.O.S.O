// ============================================================
// AVIACIONES EL C.O.S.O - Sistema de Gestión Integral v2.0
// ============================================================

const DB = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch(e) { return []; } },
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  getOne: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; } },
  setOne: (key, data) => localStorage.setItem(key, JSON.stringify(data))
};

function genId(arr) {
  if (!arr || arr.length === 0) return 1;
  return Math.max(...arr.map(x => x.id)) + 1;
}
function formatCurrency(n) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
}
function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
}

const SEED = {
  countries: [{id:1,name:'Colombia'},{id:2,name:'Estados Unidos'},{id:3,name:'España'},{id:4,name:'México'},{id:5,name:'Argentina'},{id:6,name:'Brasil'},{id:7,name:'Perú'}],
  departments: [
    {id:1,name:'Cundinamarca',countryId:1},{id:2,name:'Antioquia',countryId:1},{id:3,name:'Valle del Cauca',countryId:1},
    {id:4,name:'Atlántico',countryId:1},{id:5,name:'Bolívar',countryId:1},{id:6,name:'Florida',countryId:2},
    {id:7,name:'New York',countryId:2},{id:8,name:'California',countryId:2},{id:9,name:'Comunidad de Madrid',countryId:3},
    {id:10,name:'Cataluña',countryId:3},{id:11,name:'Ciudad de México',countryId:4},{id:12,name:'Buenos Aires',countryId:5},
    {id:13,name:'São Paulo',countryId:6},{id:14,name:'Lima',countryId:7}
  ],
  cities: [
    {id:1,name:'Bogotá',departmentId:1},{id:2,name:'Medellín',departmentId:2},{id:3,name:'Cali',departmentId:3},
    {id:4,name:'Barranquilla',departmentId:4},{id:5,name:'Cartagena',departmentId:5},{id:6,name:'Miami',departmentId:6},
    {id:7,name:'Nueva York',departmentId:7},{id:8,name:'Los Ángeles',departmentId:8},{id:9,name:'Madrid',departmentId:9},
    {id:10,name:'Barcelona',departmentId:10},{id:11,name:'Ciudad de México',departmentId:11},
    {id:12,name:'Buenos Aires',departmentId:12},{id:13,name:'São Paulo',departmentId:13},{id:14,name:'Lima',departmentId:14}
  ],
  reservationStatuses: [{id:1,name:'Reservada'},{id:2,name:'Confirmada'},{id:3,name:'Cancelada'},{id:4,name:'Expirada'}],
  users: [
    {id:1,idNumber:'ADMIN001',idType:'cedula',firstName:'Super',lastName:'Administrador',email:'admin@coso.com',password:'admin123',role:'superadmin',address:'Sede Principal',cityId:1,phone1:'3001234567',phone2:''},
    {id:2,idNumber:'AGENT001',idType:'cedula',firstName:'Carlos',lastName:'Agente Pérez',email:'agente@coso.com',password:'agente123',role:'agent',address:'Terminal Aérea',cityId:1,phone1:'3007654321',phone2:'3107654321'},
    {id:3,idNumber:'12345678',idType:'cedula',firstName:'María',lastName:'González López',email:'maria@email.com',password:'maria123',role:'client',address:'Calle 72 #10-45',cityId:1,phone1:'3012345678',phone2:''}
  ],
  flights: [
    {id:1,code:'CS001',originCityId:1,destCityId:9,departureDate:'2026-05-22T08:00',arrivalDate:'2026-05-22T22:30',capacity:150,basePrice:1850000,status:'Programado'},
    {id:2,code:'CS002',originCityId:1,destCityId:7,departureDate:'2026-06-10T22:00',arrivalDate:'2026-06-11T06:30',capacity:180,basePrice:2200000,status:'Programado'},
    {id:3,code:'CS003',originCityId:2,destCityId:5,departureDate:'2026-05-25T06:00',arrivalDate:'2026-05-25T07:30',capacity:80,basePrice:450000,status:'Programado'},
    {id:4,code:'CS004',originCityId:1,destCityId:2,departureDate:'2026-05-28T14:00',arrivalDate:'2026-05-28T15:30',capacity:100,basePrice:380000,status:'Programado'},
    {id:5,code:'CS005',originCityId:1,destCityId:6,departureDate:'2026-07-15T10:00',arrivalDate:'2026-07-15T14:00',capacity:200,basePrice:1500000,status:'Programado'},
    {id:6,code:'CS006',originCityId:3,destCityId:12,departureDate:'2026-08-05T15:00',arrivalDate:'2026-08-06T01:00',capacity:160,basePrice:1750000,status:'Programado'},
    {id:7,code:'CS007',originCityId:1,destCityId:14,departureDate:'2026-09-12T07:00',arrivalDate:'2026-09-12T10:00',capacity:140,basePrice:980000,status:'Programado'},
    {id:8,code:'CS008',originCityId:2,destCityId:11,departureDate:'2026-10-18T13:00',arrivalDate:'2026-10-18T15:00',capacity:120,basePrice:870000,status:'Programado'},
    {id:9,code:'CS009',originCityId:1,destCityId:6,departureDate:'2026-11-20T09:00',arrivalDate:'2026-11-20T13:00',capacity:160,basePrice:1650000,status:'Programado'}
  ],
  packages: [
    {id:1,name:'Hotel Boutique Madrid Centro',description:'Alojamiento 4 estrellas en el corazón de Madrid, desayuno incluido.',destination:'Madrid',price:850000,status:'Disponible',type:'Alojamiento'},
    {id:2,name:'Tour Ciudad Nueva York',description:'Recorrido completo por Manhattan, Brooklyn y Times Square. 8 horas.',destination:'Nueva York',price:650000,status:'Disponible',type:'Tour'},
    {id:3,name:'Transfer Aeropuerto Miami',description:'Transporte privado desde el aeropuerto MIA a tu hotel.',destination:'Miami',price:180000,status:'Disponible',type:'Transporte'},
    {id:4,name:'Paquete Todo Incluido Cartagena',description:'Hotel Caribe, transporte y tour por la ciudad amurallada.',destination:'Cartagena',price:1200000,status:'Disponible',type:'Combinado'},
    {id:5,name:'City Tour Buenos Aires',description:'Tour por La Boca, San Telmo, Recoleta y Puerto Madero.',destination:'Buenos Aires',price:420000,status:'Disponible',type:'Tour'},
    {id:6,name:'Hotel Medellín Business',description:'Hotel ejecutivo 5 estrellas con spa y centro de negocios.',destination:'Medellín',price:550000,status:'Disponible',type:'Alojamiento'}
  ],
  reservations: [{id:1,clientId:3,flightId:1,datetime:'2026-05-20T10:00',totalValue:2700000,statusId:2}],
  tickets: [{id:1,reservationId:1,seatNumber:'12A',class:'Económica',finalPrice:1850000}],
  reservationPackages: [{id:1,reservationId:1,packageId:1}],
  reservationHistory: [
    {id:1,reservationId:1,statusId:1,datetime:'2026-05-20T10:00',note:'Reserva creada por cliente'},
    {id:2,reservationId:1,statusId:2,datetime:'2026-05-20T11:30',note:'Pago confirmado por agente'}
  ]
};

function initData() {
  // Siempre recargar datos de SEED (menos usuarios y reservaciones)
  Object.entries(SEED).forEach(([k,v]) => {
    if (k !== 'users' && k !== 'reservations' && k !== 'tickets' && k !== 'reservationHistory' && k !== 'reservationPackages') {
      DB.set(k, v);
    } else if (!DB.get(k).length) {
      DB.set(k, v);
    }
  });
}

function getCurrentUser() { return DB.getOne('currentUser'); }
function requireAuth(role) {
  const user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  if (role && user.role !== role) { window.location.href = 'index.html'; return null; }
  return user;
}
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; }

function getCityName(id) {
  const city = DB.get('cities').find(c => c.id == id);
  if (!city) return '-';
  const dept = DB.get('departments').find(d => d.id == city.departmentId);
  const country = DB.get('countries').find(c => c.id == (dept ? dept.countryId : 0));
  return `${city.name}${dept ? ', '+dept.name : ''}${country ? ', '+country.name : ''}`;
}
function getFlightLabel(id) {
  const f = DB.get('flights').find(x => x.id == id);
  if (!f) return '-';
  const o = DB.get('cities').find(c => c.id == f.originCityId);
  const d = DB.get('cities').find(c => c.id == f.destCityId);
  return `${f.code}: ${o?o.name:'?'} → ${d?d.name:'?'}`;
}
function getStatusName(id) { const s = DB.get('reservationStatuses').find(x => x.id == id); return s ? s.name : '-'; }
function getStatusBadgeClass(name) {
  const map = {'Reservada':'badge-reserved','Confirmada':'badge-confirmed','Cancelada':'badge-cancelled','Expirada':'badge-expired','Programado':'badge-scheduled','Abordando':'badge-boarding','En vuelo':'badge-flying','Finalizado':'badge-done','Cancelado':'badge-cancelled'};
  return map[name] || '';
}
function getClientName(id) { const u = DB.get('users').find(x => x.id == id); return u ? `${u.firstName} ${u.lastName}` : '-'; }

// ========= FILTROS Y BÚSQUEDA =========
function filterFlights(flights, filters) {
  return flights.filter(f => {
    if (filters.status && f.status !== filters.status) return false;
    if (filters.origin && f.originCityId != filters.origin) return false;
    if (filters.destination && f.destCityId != filters.destination) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const cities = DB.get('cities');
      const o = cities.find(c => c.id == f.originCityId);
      const d = cities.find(c => c.id == f.destCityId);
      const searchText = `${f.code} ${o?.name || ''} ${d?.name || ''}`.toLowerCase();
      if (!searchText.includes(q)) return false;
    }
    return true;
  });
}

function filterReservations(reservations, filters) {
  return reservations.filter(r => {
    if (filters.status && r.statusId != filters.status) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const searchText = `${getClientName(r.clientId)} ${getFlightLabel(r.flightId)}`.toLowerCase();
      if (!searchText.includes(q)) return false;
    }
    return true;
  });
}

// ========= VALIDACIONES =========
function validateFlight(data) {
  const errors = [];
  if (!data.code || !data.code.trim()) errors.push('Código de vuelo requerido');
  if (!data.originCityId) errors.push('Seleccione ciudad de origen');
  if (!data.destCityId) errors.push('Seleccione ciudad de destino');
  if (data.originCityId == data.destCityId) errors.push('Origen y destino deben ser diferentes');
  if (!data.departureDate) errors.push('Fecha de salida requerida');
  if (!data.arrivalDate) errors.push('Fecha de llegada requerida');
  if (new Date(data.departureDate) >= new Date(data.arrivalDate)) errors.push('Fecha de llegada debe ser posterior a la salida');
  
  // Validar que las fechas sean futuras (posteriores a mayo 19, 2026)
  const baseDate = new Date('2026-05-19');
  const depDate = new Date(data.departureDate);
  if (depDate < baseDate) errors.push('La fecha de salida debe ser en o después de mayo 19, 2026');
  
  if (!data.capacity || data.capacity < 1) errors.push('Capacidad debe ser mayor a 0');
  if (!data.basePrice || data.basePrice < 0) errors.push('Precio base no válido');
  return errors;
}

// ========= MAPA DE ASIENTOS =========
function generateSeatMap(flightId) {
  const flight = DB.get('flights').find(f => f.id == flightId);
  if (!flight) return '';
  const tickets = DB.get('tickets').filter(t => {
    const res = DB.get('reservations').find(r => r.id == t.reservationId);
    return res && res.flightId == flightId;
  });
  const occupiedSeats = new Set(tickets.map(t => t.seatNumber));
  const rows = 6;
  const cols = 5;
  let html = '<div class="seat-map">';
  html += '<p style="font-size:0.8rem;color:#6b7280;margin-bottom:0.5rem;">Haz click para seleccionar asiento:</p>';
  for (let i = 0; i < rows; i++) {
    html += '<div class="seat-row">';
    for (let j = 0; j < cols; j++) {
      const seatNum = (i + 1) + String.fromCharCode(65 + j);
      const isOccupied = occupiedSeats.has(seatNum);
      html += `<button type="button" class="seat ${isOccupied ? 'occupied' : 'available'}" 
               data-seat="${seatNum}" 
               ${isOccupied ? 'disabled' : 'onclick="selectSeat(this)"'}
               title="${seatNum}">${seatNum}</button>`;
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function selectSeat(btn) {
  const seatInput = document.getElementById('seatNumber');
  document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
  btn.classList.add('selected');
  seatInput.value = btn.dataset.seat;
  updateReserveSummary();
}
window.selectSeat = selectSeat;

// ========= PRECIO DINÁMICO Y RESUMEN =========
function getCurrentReserveSummary() {
  const flightId = parseInt(document.getElementById('reserveForm').dataset.flightId);
  const flight = DB.get('flights').find(f => f.id == flightId);
  const ticketClass = document.getElementById('ticketClass')?.value || 'Económica';
  const selectedPkgCheckboxes = document.querySelectorAll('.pkg-checkbox:checked');
  
  if (!flight) return null;
  
  const classMult = { 'Económica': 1, 'Ejecutiva': 1.5, 'Primera clase': 2.5 };
  const ticketPrice = flight.basePrice * (classMult[ticketClass] || 1);
  
  let packagesTotal = 0;
  const selectedPackages = [];
  selectedPkgCheckboxes.forEach(checkbox => {
    const pkgId = parseInt(checkbox.value);
    const pkg = DB.get('packages').find(p => p.id == pkgId);
    if (pkg) {
      packagesTotal += pkg.price;
      selectedPackages.push(pkg);
    }
  });
  
  return {
    flight,
    ticketClass,
    ticketPrice,
    packages: selectedPackages,
    packagesTotal,
    totalPrice: ticketPrice + packagesTotal
  };
}

function updateReserveSummary() {
  const summary = getCurrentReserveSummary();
  const container = document.getElementById('reserveSummary');
  if (!container || !summary) return;
  
  let html = '<div class="reserve-summary"><h4>📋 Resumen de Compra</h4>';
  html += `<div class="summary-row"><span>Vuelo:</span><strong>${summary.flight.code}</strong></div>`;
  html += `<div class="summary-row"><span>Clase:</span><strong>${summary.ticketClass}</strong></div>`;
  html += `<div class="summary-row"><span>Precio Tiquete:</span><strong>${formatCurrency(summary.ticketPrice)}</strong></div>`;
  
  if (summary.packages.length > 0) {
    html += '<div class="summary-packages"><strong>Paquetes seleccionados:</strong>';
    summary.packages.forEach(pkg => {
      html += `<div class="pkg-summary-item">• ${pkg.name}: ${formatCurrency(pkg.price)}</div>`;
    });
    html += '</div>';
    html += `<div class="summary-row"><span>Subtotal paquetes:</span><strong>${formatCurrency(summary.packagesTotal)}</strong></div>`;
  }
  
  html += `<div class="summary-total"><span>Total:</span><span class="total-amount">${formatCurrency(summary.totalPrice)}</span></div>`;
  html += '</div>';
  
  container.innerHTML = html;
}
window.updateReserveSummary = updateReserveSummary;

function populateSelect(selectEl, options, valueKey, labelFn, placeholder) {
  selectEl.innerHTML = placeholder ? `<option value="">-- ${placeholder} --</option>` : '';
  options.forEach(o => { const opt = document.createElement('option'); opt.value = o[valueKey]; opt.textContent = labelFn(o); selectEl.appendChild(opt); });
}
function buildCityOptions(selectEl, placeholder) {
  const cities = DB.get('cities'), depts = DB.get('departments'), countries = DB.get('countries');
  selectEl.innerHTML = placeholder ? `<option value="">-- ${placeholder} --</option>` : '';
  countries.forEach(co => {
    const coDepts = depts.filter(d => d.countryId == co.id);
    coDepts.forEach(dept => {
      const dCities = cities.filter(c => c.departmentId == dept.id);
      if (!dCities.length) return;
      const group = document.createElement('optgroup');
      group.label = `${co.name} - ${dept.name}`;
      dCities.forEach(city => { const opt = document.createElement('option'); opt.value = city.id; opt.textContent = city.name; group.appendChild(opt); });
      selectEl.appendChild(group);
    });
  });
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.closeModal = closeModal;

function showToast(msg, type='success') {
  let t = document.getElementById('toastContainer');
  if (!t) { t = document.createElement('div'); t.id = 'toastContainer'; t.style.cssText='position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;'; document.body.appendChild(t); }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  t.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3500);
}

// ========= LOGIN =========
function initLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const user = DB.get('users').find(u => u.email === email && u.password === password);
    if (user) {
      DB.setOne('currentUser', user);
      if (user.role === 'superadmin') window.location.href = 'admin.html';
      else if (user.role === 'agent') window.location.href = 'agent.html';
      else window.location.href = 'user.html';
    } else {
      document.getElementById('loginError').style.display = 'block';
    }
  });
}

// ========= REGISTER =========
function initRegisterPage() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  const countrySelect = document.getElementById('regCountry');
  const deptSelect = document.getElementById('regDept');
  const citySelect = document.getElementById('regCity');
  populateSelect(countrySelect, DB.get('countries'), 'id', c => c.name, 'Seleccione país');
  countrySelect.addEventListener('change', function() {
    const depts = DB.get('departments').filter(d => d.countryId == this.value);
    populateSelect(deptSelect, depts, 'id', d => d.name, 'Seleccione departamento');
    citySelect.innerHTML = '<option value="">-- Seleccione ciudad --</option>';
  });
  deptSelect.addEventListener('change', function() {
    const cities = DB.get('cities').filter(c => c.departmentId == this.value);
    populateSelect(citySelect, cities, 'id', c => c.name, 'Seleccione ciudad');
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const users = DB.get('users');
    const email = document.getElementById('regEmail').value.trim();
    if (users.find(u => u.email === email)) { showToast('Este correo ya está registrado.', 'error'); return; }
    const cityId = parseInt(document.getElementById('regCity').value);
    if (!cityId) { showToast('Seleccione una ciudad válida.', 'error'); return; }
    users.push({
      id: genId(users), idType: document.getElementById('regIdType').value,
      idNumber: document.getElementById('regIdNumber').value.trim(),
      firstName: document.getElementById('regFirstName').value.trim(),
      lastName: document.getElementById('regLastName').value.trim(),
      email, password: document.getElementById('regPassword').value, role: 'client',
      address: document.getElementById('regAddress').value.trim(),
      cityId, phone1: document.getElementById('regPhone1').value.trim(),
      phone2: document.getElementById('regPhone2').value.trim()
    });
    DB.set('users', users);
    showToast('¡Registro exitoso! Inicia sesión para continuar.');
    setTimeout(() => window.location.href = 'login.html', 1500);
  });
}

// ========= ADMIN PAGE =========
function updateProfileCard(user, role) {
  const sidebar = document.getElementById('sidebarContainer') || document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.setAttribute('data-role', role.toLowerCase().replace('admin', 'super-admin').replace('superadmin', 'super-admin'));
  }
  
  // Actualizar información del perfil
  const profileName = document.getElementById('profileUserName');
  const profileRole = document.getElementById('profileRole');
  const profileBadge = document.getElementById('profileBadge');
  
  if (profileName) profileName.textContent = `${user.firstName} ${user.lastName}`;
  if (profileRole) profileRole.textContent = role === 'superadmin' ? 'Super Administrador' : role === 'agent' ? 'Agente de Viajes' : 'Cliente';
  if (profileBadge) profileBadge.textContent = role === 'superadmin' ? 'Administrador' : role === 'agent' ? 'Agente' : 'Usuario';
  
  // Actualizar estadísticas rápidas
  const statFlights = document.getElementById('statFlights');
  const statReservations = document.getElementById('statReservations');
  const statUsers = document.getElementById('statUsers');
  
  if (statFlights) statFlights.textContent = DB.get('flights')?.length || 0;
  if (statReservations) statReservations.textContent = DB.get('reservations')?.length || 0;
  if (statUsers) statUsers.textContent = DB.get('users')?.length || 0;
}

function initAdminPage() {
  const user = requireAuth('superadmin');
  if (!user) return;
  
  updateProfileCard(user, 'superadmin');
  
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.dataset.tab;
      const section = document.getElementById(tabId);
      if (section) section.classList.add('active');
      if (tabId==='tab-flights') renderAdminFlights();
      if (tabId==='tab-clients') renderAdminClients();
      if (tabId==='tab-packages') renderAdminPackages();
      if (tabId==='tab-geo') renderAdminGeo();
      if (tabId==='tab-users') renderAdminUsers();
      if (tabId==='tab-reports') renderAdminReports();
    });
  });
  renderAdminFlights(); setupAdminFlights(); setupAdminClients(); setupAdminPackages(); setupAdminGeo(); setupAdminUsers();
}

function renderAdminFlights() {
  let flights = DB.get('flights');
  const filterStatus = document.getElementById('filterFlightStatus')?.value;
  const filterOrigin = document.getElementById('filterFlightOrigin')?.value;
  const filterDest = document.getElementById('filterFlightDest')?.value;
  const searchQuery = document.getElementById('searchFlightInput')?.value;
  
  flights = filterFlights(flights, {
    status: filterStatus,
    origin: filterOrigin ? parseInt(filterOrigin) : null,
    destination: filterDest ? parseInt(filterDest) : null,
    query: searchQuery
  });
  
  const cities = DB.get('cities');
  const tbody = document.getElementById('flightsTableBody');
  if (!tbody) return;
  tbody.innerHTML = flights.map(f => {
    const o = cities.find(c=>c.id==f.originCityId), d = cities.find(c=>c.id==f.destCityId);
    return `<tr><td>${f.code}</td><td>${o?o.name:'-'}</td><td>${d?d.name:'-'}</td><td>${formatDate(f.departureDate)}</td><td>${formatDate(f.arrivalDate)}</td><td>${f.capacity}</td><td>${formatCurrency(f.basePrice)}</td><td><span class="badge ${getStatusBadgeClass(f.status)}">${f.status}</span></td><td><button class="btn-sm btn-edit" onclick="editFlight(${f.id})" title="Editar">✏️</button> <button class="btn-sm btn-delete" onclick="confirmDeleteFlight(${f.id})" title="Eliminar">🗑️</button></td></tr>`;
  }).join('') || '<tr><td colspan="9" style="text-align:center;color:#888;">Sin vuelos</td></tr>';
}

// ========== FUNCIONES PARA DASHBOARD CON GRÁFICOS ==========
function getFlightStatusStats() {
  const flights = DB.get('flights');
  const stats = {};
  flights.forEach(f => {
    stats[f.status] = (stats[f.status] || 0) + 1;
  });
  return stats;
}

function getReservationStatusStats() {
  const reservations = DB.get('reservations');
  const statuses = {1:'Reservada', 2:'Confirmada', 3:'Cancelada', 4:'Expirada'};
  const stats = {};
  Object.values(statuses).forEach(s => stats[s] = 0);
  reservations.forEach(r => {
    const status = DB.get('reservationStatuses').find(s=>s.id==r.statusId)?.name || 'Desconocida';
    stats[status] = (stats[status] || 0) + 1;
  });
  return stats;
}

function getTopRoutes() {
  const flights = DB.get('flights');
  const cities = DB.get('cities');
  const routes = {};
  flights.forEach(f => {
    const origin = cities.find(c=>c.id==f.originCityId)?.name || 'Desconocido';
    const dest = cities.find(c=>c.id==f.destCityId)?.name || 'Desconocido';
    const route = `${origin} → ${dest}`;
    routes[route] = (routes[route] || 0) + 1;
  });
  return Object.entries(routes).sort((a,b)=>b[1]-a[1]).slice(0,5);
}

function getRevenuePerFlight() {
  const flights = DB.get('flights');
  const reservations = DB.get('reservations');
  const tickets = DB.get('tickets');
  const revenue = {};
  flights.forEach(f => {
    const flightReservations = reservations.filter(r=>r.flightId==f.id);
    let total = 0;
    flightReservations.forEach(res => {
      const resTickets = tickets.filter(t=>t.reservationId==res.id);
      resTickets.forEach(t => {
        total += t.finalPrice || 0;
      });
    });
    revenue[f.code] = total;
  });
  return Object.entries(revenue).sort((a,b)=>b[1]-a[1]).slice(0,5);
}

function getOccupancyStats() {
  const flights = DB.get('flights');
  const reservations = DB.get('reservations');
  const tickets = DB.get('tickets');
  let totalCapacity = 0, totalReserved = 0;
  flights.forEach(f => {
    totalCapacity += f.capacity;
    const flightReservations = reservations.filter(r=>r.flightId==f.id);
    flightReservations.forEach(res => {
      const resTickets = tickets.filter(t=>t.reservationId==res.id);
      totalReserved += resTickets.length;
    });
  });
  return totalCapacity > 0 ? Math.round((totalReserved / totalCapacity) * 100) : 0;
}

function initializeDashboardCharts() {
  setTimeout(() => {
    // Gráfico 1: Vuelos por Estado
    const flightStatusData = getFlightStatusStats();
    const ctx1 = document.getElementById('chartFlightStatus');
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: Object.keys(flightStatusData),
          datasets: [{
            label: 'Cantidad de Vuelos',
            data: Object.values(flightStatusData),
            backgroundColor: ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6'],
            borderColor: ['#1e40af','#047857','#d97706','#991b1b','#5b21b6'],
            borderWidth: 2
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: {display:false} } }
      });
    }

    // Gráfico 2: Reservas por Estado
    const reservStatusData = getReservationStatusStats();
    const ctx2 = document.getElementById('chartReservationStatus');
    if (ctx2) {
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: Object.keys(reservStatusData),
          datasets: [{
            label: 'Cantidad de Reservas',
            data: Object.values(reservStatusData),
            backgroundColor: ['#06b6d4','#06b6d4','#f43f5e','#94a3b8'],
            borderColor: ['#0891b2','#0891b2','#be123c','#64748b'],
            borderWidth: 2
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: {display:false} } }
      });
    }

    // Gráfico 3: Rutas Más Frecuentes
    const topRoutes = getTopRoutes();
    const ctx3 = document.getElementById('chartTopRoutes');
    if (ctx3) {
      new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: topRoutes.map(r=>r[0]),
          datasets: [{
            label: 'Frecuencia',
            data: topRoutes.map(r=>r[1]),
            backgroundColor: '#2563eb',
            borderColor: '#1e40af',
            borderWidth: 2
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: {display:false} } }
      });
    }

    // Gráfico 4: Ingresos por Vuelo
    const revenue = getRevenuePerFlight();
    const ctx4 = document.getElementById('chartRevenuePerFlight');
    if (ctx4) {
      new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: revenue.map(r=>r[0]),
          datasets: [{
            label: 'Ingresos (COP)',
            data: revenue.map(r=>r[1]),
            backgroundColor: '#10b981',
            borderColor: '#047857',
            borderWidth: 2
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: {display:false}, tooltip: { callbacks: { label: (ctx)=>formatCurrency(ctx.parsed.x) } } } }
      });
    }

    // Gráfico 5: Ocupación Promedio
    const occupancy = getOccupancyStats();
    const ctx5 = document.getElementById('chartOccupancy');
    if (ctx5) {
      new Chart(ctx5, {
        type: 'bar',
        data: {
          labels: ['Ocupación Promedio'],
          datasets: [{
            label: 'Porcentaje (%)',
            data: [occupancy],
            backgroundColor: occupancy > 75 ? '#ef4444' : occupancy > 50 ? '#f59e0b' : '#10b981',
            borderColor: occupancy > 75 ? '#991b1b' : occupancy > 50 ? '#d97706' : '#047857',
            borderWidth: 2
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', scales: { x: { max: 100 } }, plugins: { legend: {display:false}, tooltip: { callbacks: { label: (ctx)=>`${ctx.parsed.x}%` } } } }
      });
    }
  }, 100);
}

function setupAdminFlights() {
  const originSel = document.getElementById('flightOrigin'), destSel = document.getElementById('flightDest');
  const filterOrigin = document.getElementById('filterFlightOrigin');
  const filterDest = document.getElementById('filterFlightDest');
  
  if (originSel) buildCityOptions(originSel, 'Ciudad de origen');
  if (destSel) buildCityOptions(destSel, 'Ciudad de destino');
  if (filterOrigin) buildCityOptions(filterOrigin, 'Todos');
  if (filterDest) buildCityOptions(filterDest, 'Todos');
  
  // Event listeners para filtros
  const filterStatus = document.getElementById('filterFlightStatus');
  const searchInput = document.getElementById('searchFlightInput');
  
  if (filterStatus) filterStatus.addEventListener('change', renderAdminFlights);
  if (filterOrigin) filterOrigin.addEventListener('change', renderAdminFlights);
  if (filterDest) filterDest.addEventListener('change', renderAdminFlights);
  if (searchInput) searchInput.addEventListener('input', renderAdminFlights);
  
  // Inicializar visualización
  renderAdminFlights();
  initializeDashboardCharts();
  
  const form = document.getElementById('flightForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const flights = DB.get('flights'), editId = parseInt(this.dataset.editId);
    const data = { 
      code: document.getElementById('flightCode').value.trim().toUpperCase(), 
      originCityId: parseInt(document.getElementById('flightOrigin').value), 
      destCityId: parseInt(document.getElementById('flightDest').value), 
      departureDate: document.getElementById('flightDeparture').value, 
      arrivalDate: document.getElementById('flightArrival').value, 
      capacity: parseInt(document.getElementById('flightCapacity').value), 
      basePrice: parseFloat(document.getElementById('flightPrice').value), 
      status: document.getElementById('flightStatus').value 
    };
    
    // Validar
    const errors = validateFlight(data);
    if (errors.length) {
      showToast(errors.join(', '), 'error');
      return;
    }
    
    if (editId) { 
      const idx = flights.findIndex(f=>f.id===editId); 
      flights[idx]={...flights[idx],...data}; 
      showToast('Vuelo actualizado.'); 
      delete form.dataset.editId; 
    } else { 
      if (flights.find(f=>f.code===data.code)) { 
        showToast('Código ya existe.','error'); 
        return; 
      } 
      flights.push({id:genId(flights),...data}); 
      showToast('Vuelo agregado.'); 
    }
    DB.set('flights', flights); 
    form.reset(); 
    buildCityOptions(originSel,'Ciudad de origen'); 
    buildCityOptions(destSel,'Ciudad de destino'); 
    if (filterOrigin) buildCityOptions(filterOrigin, 'Todos');
    if (filterDest) buildCityOptions(filterDest, 'Todos');
    renderAdminFlights(); 
    initializeDashboardCharts();
    closeModal('flightModal');
  });
}

window.confirmDeleteFlight = function(id) { 
  if(confirm('¿Estás seguro de que deseas eliminar este vuelo? Esta acción no se puede deshacer.')) {
    deleteFlight(id);
  }
};

window.deleteFlight = function(id) { 
  DB.set('flights',DB.get('flights').filter(f=>f.id!=id)); 
  showToast('Vuelo eliminado.'); 
  renderAdminFlights();
  initializeDashboardCharts(); 
};

function renderAdminClients() {
  const clients = DB.get('users').filter(u=>u.role==='client');
  const tbody = document.getElementById('clientsTableBody'); if(!tbody) return;
  tbody.innerHTML = clients.map(c=>`<tr><td>${c.idNumber}</td><td>${c.firstName} ${c.lastName}</td><td>${c.email}</td><td>${c.phone1}</td><td>${getCityName(c.cityId)}</td><td><button class="btn-sm btn-edit" onclick="editClient(${c.id})">✏️</button> <button class="btn-sm btn-delete" onclick="deleteClient(${c.id})">🗑️</button></td></tr>`).join('')||'<tr><td colspan="6" style="text-align:center;color:#888;">Sin clientes</td></tr>';
}
function setupAdminClients() {
  const cs=document.getElementById('clientCitySelect'); if(cs) buildCityOptions(cs,'Seleccione ciudad');
  const form=document.getElementById('clientForm'); if(!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const users=DB.get('users'), editId=parseInt(this.dataset.editId), email=document.getElementById('clientEmail').value.trim();
    const data={idType:document.getElementById('clientIdType').value,idNumber:document.getElementById('clientIdNumber').value.trim(),firstName:document.getElementById('clientFirstName').value.trim(),lastName:document.getElementById('clientLastName').value.trim(),email,address:document.getElementById('clientAddress').value.trim(),cityId:parseInt(document.getElementById('clientCitySelect').value),phone1:document.getElementById('clientPhone1').value.trim(),phone2:document.getElementById('clientPhone2').value.trim(),role:'client'};
    if(editId){const idx=users.findIndex(u=>u.id===editId);users[idx]={...users[idx],...data};showToast('Cliente actualizado.');delete form.dataset.editId;}
    else{if(users.find(u=>u.email===email)){showToast('Email ya registrado.','error');return;}const pwd=document.getElementById('clientPassword').value;users.push({id:genId(users),...data,password:pwd});showToast('Cliente registrado.');}
    DB.set('users',users);form.reset();buildCityOptions(document.getElementById('clientCitySelect'),'Seleccione ciudad');renderAdminClients();closeModal('clientModal');
  });
}
window.editClient = function(id) {
  const c=DB.get('users').find(u=>u.id==id); if(!c) return;
  document.getElementById('clientFormTitle').textContent='Editar Cliente'; document.getElementById('clientSubmitBtn').textContent='Actualizar';
  ['clientIdType','clientIdNumber','clientFirstName','clientLastName','clientEmail','clientAddress','clientPhone1'].forEach((fld,i)=>{
    const keys=['idType','idNumber','firstName','lastName','email','address','phone1'];
    document.getElementById(fld).value=c[keys[i]]||'';
  });
  document.getElementById('clientPhone2').value=c.phone2||'';
  document.getElementById('clientPasswordRow').style.display='none';
  buildCityOptions(document.getElementById('clientCitySelect'),'Seleccione ciudad'); document.getElementById('clientCitySelect').value=c.cityId;
  document.getElementById('clientForm').dataset.editId=id; openModal('clientModal');
};
window.deleteClient = function(id) { if(!confirm('¿Eliminar cliente?')) return; DB.set('users',DB.get('users').filter(u=>u.id!=id)); showToast('Cliente eliminado.'); renderAdminClients(); };
window.openClientModal = function() {
  const form=document.getElementById('clientForm'); form.reset(); delete form.dataset.editId;
  document.getElementById('clientFormTitle').textContent='Agregar Cliente'; document.getElementById('clientSubmitBtn').textContent='Registrar';
  document.getElementById('clientPasswordRow').style.display='';
  buildCityOptions(document.getElementById('clientCitySelect'),'Seleccione ciudad'); openModal('clientModal');
};

function renderAdminPackages() {
  const pkgs=DB.get('packages'); const tbody=document.getElementById('packagesTableBody'); if(!tbody) return;
  tbody.innerHTML=pkgs.map(p=>`<tr><td>${p.name}</td><td>${p.type}</td><td>${p.destination}</td><td>${formatCurrency(p.price)}</td><td><span class="badge ${p.status==='Disponible'?'badge-confirmed':'badge-cancelled'}">${p.status}</span></td><td><button class="btn-sm btn-edit" onclick="editPackage(${p.id})">✏️</button> <button class="btn-sm btn-delete" onclick="deletePackage(${p.id})">🗑️</button></td></tr>`).join('')||'<tr><td colspan="6" style="text-align:center;color:#888;">Sin paquetes</td></tr>';
}
function setupAdminPackages() {
  const form=document.getElementById('packageForm'); if(!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault(); const pkgs=DB.get('packages'), editId=parseInt(this.dataset.editId);
    const data={name:document.getElementById('pkgName').value.trim(),type:document.getElementById('pkgType').value,destination:document.getElementById('pkgDestination').value.trim(),description:document.getElementById('pkgDescription').value.trim(),price:parseFloat(document.getElementById('pkgPrice').value),status:document.getElementById('pkgStatus').value};
    if(editId){const idx=pkgs.findIndex(p=>p.id===editId);pkgs[idx]={...pkgs[idx],...data};showToast('Paquete actualizado.');delete form.dataset.editId;}
    else{pkgs.push({id:genId(pkgs),...data});showToast('Paquete agregado.');}
    DB.set('packages',pkgs);form.reset();renderAdminPackages();closeModal('packageModal');
  });
}
window.editPackage = function(id) {
  const p=DB.get('packages').find(x=>x.id==id); if(!p) return;
  document.getElementById('pkgFormTitle').textContent='Editar Paquete'; document.getElementById('pkgSubmitBtn').textContent='Actualizar';
  document.getElementById('pkgName').value=p.name; document.getElementById('pkgType').value=p.type; document.getElementById('pkgDestination').value=p.destination; document.getElementById('pkgDescription').value=p.description; document.getElementById('pkgPrice').value=p.price; document.getElementById('pkgStatus').value=p.status;
  document.getElementById('packageForm').dataset.editId=id; openModal('packageModal');
};
window.deletePackage = function(id) { if(!confirm('¿Eliminar paquete?')) return; DB.set('packages',DB.get('packages').filter(p=>p.id!=id)); showToast('Paquete eliminado.'); renderAdminPackages(); };
window.openPackageModal = function() {
  const form=document.getElementById('packageForm'); form.reset(); delete form.dataset.editId;
  document.getElementById('pkgFormTitle').textContent='Agregar Paquete'; document.getElementById('pkgSubmitBtn').textContent='Agregar'; openModal('packageModal');
};

function renderAdminGeo() {
  const countries=DB.get('countries'),depts=DB.get('departments'),cities=DB.get('cities');
  const ct=document.getElementById('countriesTableBody'); if(ct) ct.innerHTML=countries.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td><button class="btn-sm btn-edit" onclick="editCountry(${c.id})">✏️</button> <button class="btn-sm btn-delete" onclick="deleteCountry(${c.id})">🗑️</button></td></tr>`).join('');
  const dt=document.getElementById('deptsTableBody'); if(dt) dt.innerHTML=depts.map(d=>{const co=countries.find(c=>c.id==d.countryId);return`<tr><td>${d.id}</td><td>${d.name}</td><td>${co?co.name:'-'}</td><td><button class="btn-sm btn-edit" onclick="editDept(${d.id})">✏️</button> <button class="btn-sm btn-delete" onclick="deleteDept(${d.id})">🗑️</button></td></tr>`;}).join('');
  const cit=document.getElementById('citiesTableBody'); if(cit) cit.innerHTML=cities.map(c=>{const dept=depts.find(d=>d.id==c.departmentId),co=dept?countries.find(x=>x.id==dept.countryId):null;return`<tr><td>${c.id}</td><td>${c.name}</td><td>${dept?dept.name:'-'}</td><td>${co?co.name:'-'}</td><td><button class="btn-sm btn-edit" onclick="editCity(${c.id})">✏️</button> <button class="btn-sm btn-delete" onclick="deleteCity(${c.id})">🗑️</button></td></tr>`;}).join('');
}
function setupAdminGeo() {
  const cf=document.getElementById('countryForm');
  if(cf) cf.addEventListener('submit',function(e){e.preventDefault();const countries=DB.get('countries'),editId=parseInt(this.dataset.editId),name=document.getElementById('countryName').value.trim();if(editId){const idx=countries.findIndex(c=>c.id===editId);countries[idx].name=name;showToast('País actualizado.');delete this.dataset.editId;}else{countries.push({id:genId(countries),name});showToast('País agregado.');}DB.set('countries',countries);this.reset();renderAdminGeo();});
  const df=document.getElementById('deptForm');
  if(df){const sel=document.getElementById('deptCountry');if(sel)populateSelect(sel,DB.get('countries'),'id',c=>c.name,'País');df.addEventListener('submit',function(e){e.preventDefault();const depts=DB.get('departments'),editId=parseInt(this.dataset.editId),data={name:document.getElementById('deptName').value.trim(),countryId:parseInt(document.getElementById('deptCountry').value)};if(editId){const idx=depts.findIndex(d=>d.id===editId);depts[idx]={...depts[idx],...data};showToast('Departamento actualizado.');delete this.dataset.editId;}else{depts.push({id:genId(depts),...data});showToast('Departamento agregado.');}DB.set('departments',depts);this.reset();populateSelect(document.getElementById('deptCountry'),DB.get('countries'),'id',c=>c.name,'País');populateSelect(document.getElementById('cityDept'),DB.get('departments'),'id',d=>d.name,'Departamento');renderAdminGeo();});}
  const citf=document.getElementById('cityForm');
  if(citf){const sel=document.getElementById('cityDept');if(sel)populateSelect(sel,DB.get('departments'),'id',d=>d.name,'Departamento');citf.addEventListener('submit',function(e){e.preventDefault();const cities=DB.get('cities'),editId=parseInt(this.dataset.editId),data={name:document.getElementById('cityName').value.trim(),departmentId:parseInt(document.getElementById('cityDept').value)};if(editId){const idx=cities.findIndex(c=>c.id===editId);cities[idx]={...cities[idx],...data};showToast('Ciudad actualizada.');delete this.dataset.editId;}else{cities.push({id:genId(cities),...data});showToast('Ciudad agregada.');}DB.set('cities',cities);this.reset();populateSelect(document.getElementById('cityDept'),DB.get('departments'),'id',d=>d.name,'Departamento');renderAdminGeo();});}
}
window.editCountry=function(id){const c=DB.get('countries').find(x=>x.id==id);document.getElementById('countryName').value=c.name;document.getElementById('countryForm').dataset.editId=id;};
window.deleteCountry=function(id){if(!confirm('¿Eliminar país?'))return;DB.set('countries',DB.get('countries').filter(c=>c.id!=id));showToast('País eliminado.');renderAdminGeo();};
window.editDept=function(id){const d=DB.get('departments').find(x=>x.id==id);document.getElementById('deptName').value=d.name;populateSelect(document.getElementById('deptCountry'),DB.get('countries'),'id',c=>c.name,'País');document.getElementById('deptCountry').value=d.countryId;document.getElementById('deptForm').dataset.editId=id;};
window.deleteDept=function(id){if(!confirm('¿Eliminar departamento?'))return;DB.set('departments',DB.get('departments').filter(d=>d.id!=id));showToast('Departamento eliminado.');renderAdminGeo();};
window.editCity=function(id){const c=DB.get('cities').find(x=>x.id==id);document.getElementById('cityName').value=c.name;populateSelect(document.getElementById('cityDept'),DB.get('departments'),'id',d=>d.name,'Departamento');document.getElementById('cityDept').value=c.departmentId;document.getElementById('cityForm').dataset.editId=id;};
window.deleteCity=function(id){if(!confirm('¿Eliminar ciudad?'))return;DB.set('cities',DB.get('cities').filter(c=>c.id!=id));showToast('Ciudad eliminada.');renderAdminGeo();};

function renderAdminUsers() {
  const users=DB.get('users').filter(u=>u.role!=='client');
  const tbody=document.getElementById('usersTableBody'); if(!tbody) return;
  tbody.innerHTML=users.map(u=>`<tr><td>${u.firstName} ${u.lastName}</td><td>${u.email}</td><td><span class="badge ${u.role==='superadmin'?'badge-confirmed':'badge-boarding'}">${u.role==='superadmin'?'Super Admin':'Agente'}</span></td><td>${u.phone1}</td><td><button class="btn-sm btn-edit" onclick="editSysUser(${u.id})">✏️</button>${u.id!==1?` <button class="btn-sm btn-delete" onclick="deleteSysUser(${u.id})">🗑️</button>`:''}</td></tr>`).join('');
}
function setupAdminUsers() {
  const form=document.getElementById('sysUserForm'); if(!form) return;
  form.addEventListener('submit',function(e){e.preventDefault();const users=DB.get('users'),editId=parseInt(this.dataset.editId),email=document.getElementById('sysUserEmail').value.trim();const data={firstName:document.getElementById('sysUserFirst').value.trim(),lastName:document.getElementById('sysUserLast').value.trim(),email,role:document.getElementById('sysUserRole').value,phone1:document.getElementById('sysUserPhone').value.trim(),idType:'cedula',idNumber:email,address:'',cityId:1,phone2:''};if(editId){const idx=users.findIndex(u=>u.id===editId);users[idx]={...users[idx],...data};showToast('Usuario actualizado.');delete form.dataset.editId;}else{if(users.find(u=>u.email===email)){showToast('Email ya registrado.','error');return;}users.push({id:genId(users),...data,password:document.getElementById('sysUserPwd').value});showToast('Usuario creado.');}DB.set('users',users);form.reset();renderAdminUsers();closeModal('sysUserModal');});
}
window.editSysUser=function(id){const u=DB.get('users').find(x=>x.id==id);if(!u)return;document.getElementById('sysUserFirst').value=u.firstName;document.getElementById('sysUserLast').value=u.lastName;document.getElementById('sysUserEmail').value=u.email;document.getElementById('sysUserRole').value=u.role;document.getElementById('sysUserPhone').value=u.phone1;document.getElementById('sysUserPwdRow').style.display='none';document.getElementById('sysUserForm').dataset.editId=id;openModal('sysUserModal');};
window.deleteSysUser=function(id){if(!confirm('¿Eliminar usuario?'))return;DB.set('users',DB.get('users').filter(u=>u.id!=id));showToast('Usuario eliminado.');renderAdminUsers();};
window.openSysUserModal=function(){const form=document.getElementById('sysUserForm');form.reset();delete form.dataset.editId;document.getElementById('sysUserPwdRow').style.display='';openModal('sysUserModal');};

function renderAdminReports() {
  const reservations = DB.get('reservations') || [];
  const tickets = DB.get('tickets') || [];
  const flights = DB.get('flights') || [];
  const users = DB.get('users') || [];
  const cities = DB.get('cities') || [];
  
  // ESTADÍSTICAS
  const totalFlights = flights.length;
  const totalReservations = reservations.length;
  const totalRevenue = reservations.reduce((sum, r) => sum + (r.totalValue || 0), 0);
  const totalClients = users.filter(u => u.role === 'client').length;
  
  // INGRESOS POR DESTINO
  const incomeByDest = {};
  reservations.filter(r => r.statusId === 2).forEach(r => {
    const f = flights.find(x => x.id == r.flightId);
    if (!f) return;
    const city = cities.find(c => c.id == f.destCityId);
    const key = city ? city.name : 'Desconocido';
    incomeByDest[key] = (incomeByDest[key] || 0) + r.totalValue;
  });
  
  // RESERVAS POR VUELO
  const resByFlight = {};
  reservations.forEach(r => {
    const key = getFlightLabel(r.flightId);
    resByFlight[key] = (resByFlight[key] || 0) + 1;
  });
  
  // CLIENTES FRECUENTES
  const resByClient = {};
  reservations.forEach(r => {
    resByClient[r.clientId] = (resByClient[r.clientId] || 0) + 1;
  });
  const topClients = Object.entries(resByClient).sort((a, b) => b[1] - a[1]).slice(0,5).map(([id, count]) => ({ name: getClientName(parseInt(id)), count }));
  
  // RENDERIZAR STATS
  document.getElementById('totalFlights').textContent = totalFlights;
  document.getElementById('totalReservations').textContent = totalReservations;
  document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
  document.getElementById('totalClients').textContent = totalClients;
  
  // INGRESOS POR DESTINO
  const incomeByDestBody = document.getElementById('incomeByDestBody');
  if (incomeByDestBody) {
    const total = Object.values(incomeByDest).reduce((a, b) => a + b, 0);
    incomeByDestBody.innerHTML = Object.entries(incomeByDest).sort((a, b) => b[1] - a[1]).map(([d, v]) => {
      const pct = total > 0 ? Math.round((v / total) * 100) : 0;
      return `<tr><td>${d}</td><td>${formatCurrency(v)}</td><td>${pct}%</td></tr>`;
    }).join('') || '<tr><td colspan="3" style="text-align:center; color: var(--text-muted);">Sin datos</td></tr>';
  }
  
  // RESERVAS POR VUELO
  const reservationsByFlightBody = document.getElementById('reservationsByFlightBody');
  if (reservationsByFlightBody) {
    reservationsByFlightBody.innerHTML = Object.entries(resByFlight).sort((a, b) => b[1] - a[1]).map(([f, c]) => 
      `<tr><td>${f}</td><td>${c}</td></tr>`
    ).join('') || '<tr><td colspan="2" style="text-align:center; color: var(--text-muted);">Sin datos</td></tr>';
  }
  
  // CLIENTES FRECUENTES
  const topClientsBody = document.getElementById('topClientsBody');
  if (topClientsBody) {
    topClientsBody.innerHTML = topClients.map(c => 
      `<tr><td>${c.name}</td><td>${c.count}</td></tr>`
    ).join('') || '<tr><td colspan="2" style="text-align:center; color: var(--text-muted);">Sin datos</td></tr>';
  }
  
  // HISTORIAL COMPLETO
  const fullHistoryBody = document.getElementById('fullHistoryBody');
  if (fullHistoryBody) {
    fullHistoryBody.innerHTML = reservations.map(r => {
      const statusName = getStatusName(r.statusId) || 'Desconocida';
      const statusClass = r.statusId === 2 ? 'badge-confirmed' : r.statusId === 3 ? 'badge-cancelled' : 'badge-pending';
      return `<tr>
        <td>#${r.id}</td>
        <td>${getClientName(r.clientId)}</td>
        <td>${getFlightLabel(r.flightId)}</td>
        <td>${formatDate(r.datetime)}</td>
        <td>${formatCurrency(r.totalValue)}</td>
        <td><span class="badge-status ${statusClass}">${statusName}</span></td>
      </tr>`;
    }).join('') || '<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">Sin reservas</td></tr>';
  }
}

// ========= AGENT PAGE =========
function initAgentPage() {
  const user=requireAuth('agent'); if(!user) return;
  updateProfileCard(user, 'agent');
  document.querySelectorAll('.sidebar-link').forEach(link=>{
    link.addEventListener('click',function(e){e.preventDefault();document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.remove('active'));document.querySelectorAll('.tab-section').forEach(s=>s.classList.remove('active'));this.classList.add('active');const tabId=this.dataset.tab;document.getElementById(tabId).classList.add('active');if(tabId==='tab-reservations')renderAgentReservations();if(tabId==='tab-tickets')renderAgentTickets();});
  });
  renderAgentReservations(); setupAgentReservations();
}
function renderAgentReservations() {
  let reservations = DB.get('reservations');
  const filterStatus = document.getElementById('filterReservationStatus')?.value;
  const searchQuery = document.getElementById('searchReservationInput')?.value;
  
  reservations = filterReservations(reservations, {
    status: filterStatus ? parseInt(filterStatus) : null,
    query: searchQuery
  });
  
  const tbody = document.getElementById('agentReservationsBody'); if(!tbody) return;
  tbody.innerHTML = reservations.map(r=>`<tr><td>#${r.id}</td><td>${getClientName(r.clientId)}</td><td>${getFlightLabel(r.flightId)}</td><td>${formatDate(r.datetime)}</td><td>${formatCurrency(r.totalValue)}</td><td><span class="badge ${getStatusBadgeClass(getStatusName(r.statusId))}">${getStatusName(r.statusId)}</span></td><td><button class="btn-sm btn-edit" onclick="openChangeStatus(${r.id})" title="Cambiar estado">🔄</button> <button class="btn-sm btn-view" onclick="viewReservation(${r.id})" title="Ver detalles">👁</button></td></tr>`).join('')||'<tr><td colspan="7" style="text-align:center;color:#888;">Sin reservas</td></tr>';
}

function setupAgentReservations() {
  const filterStatus = document.getElementById('filterReservationStatus');
  const searchInput = document.getElementById('searchReservationInput');
  
  if (filterStatus) filterStatus.addEventListener('change', renderAgentReservations);
  if (searchInput) searchInput.addEventListener('input', renderAgentReservations);
  
  const form = document.getElementById('changeStatusForm'); if (!form) return;
  const sel = document.getElementById('newStatusSelect');
  if(sel) populateSelect(sel, DB.get('reservationStatuses'), 'id', s=>s.name, null);
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const resId = parseInt(this.dataset.reservationId);
    const newStatusId = parseInt(document.getElementById('newStatusSelect').value);
    const note = document.getElementById('statusNote').value.trim();
    const reservations = DB.get('reservations');
    const idx = reservations.findIndex(r=>r.id===resId);
    if(idx < 0) return;
    reservations[idx].statusId = newStatusId;
    DB.set('reservations', reservations);
    const hist = DB.get('reservationHistory');
    hist.push({id: genId(hist), reservationId: resId, statusId: newStatusId, datetime: new Date().toISOString(), note});
    DB.set('reservationHistory', hist);
    showToast('Estado actualizado.');
    closeModal('changeStatusModal');
    renderAgentReservations();
  });
}
window.openChangeStatus=function(id){const form=document.getElementById('changeStatusForm');form.dataset.reservationId=id;document.getElementById('statusNote').value='';const statuses=DB.get('reservationStatuses'),sel=document.getElementById('newStatusSelect');populateSelect(sel,statuses,'id',s=>s.name,null);const r=DB.get('reservations').find(x=>x.id==id);if(r)sel.value=r.statusId;openModal('changeStatusModal');};
window.viewReservation=function(id){const r=DB.get('reservations').find(x=>x.id==id);if(!r)return;const tickets=DB.get('tickets').filter(t=>t.reservationId==id),pkgLinks=DB.get('reservationPackages').filter(rp=>rp.reservationId==id),pkgs=pkgLinks.map(rp=>DB.get('packages').find(p=>p.id==rp.packageId)).filter(Boolean),hist=DB.get('reservationHistory').filter(h=>h.reservationId==id);document.getElementById('viewResContent').innerHTML=`<div class="view-section"><h4>Información de Reserva</h4><p><strong>ID:</strong> #${r.id}</p><p><strong>Cliente:</strong> ${getClientName(r.clientId)}</p><p><strong>Vuelo:</strong> ${getFlightLabel(r.flightId)}</p><p><strong>Fecha:</strong> ${formatDate(r.datetime)}</p><p><strong>Valor Total:</strong> ${formatCurrency(r.totalValue)}</p><p><strong>Estado:</strong> <span class="badge ${getStatusBadgeClass(getStatusName(r.statusId))}">${getStatusName(r.statusId)}</span></p></div><div class="view-section"><h4>🎫 Tiquetes</h4>${tickets.map(t=>`<p>Asiento ${t.seatNumber} - <strong>${t.class}</strong> - ${formatCurrency(t.finalPrice)}</p>`).join('')||'<p>Sin tiquetes</p>'}</div><div class="view-section"><h4>🎁 Paquetes</h4>${pkgs.map(p=>`<p>${p.name} (${p.type}) - ${formatCurrency(p.price)}</p>`).join('')||'<p>Sin paquetes</p>'}</div><div class="view-section"><h4>📋 Historial</h4>${hist.map(h=>`<p style="font-size:0.85rem;">📌 ${formatDate(h.datetime)} → <strong>${getStatusName(h.statusId)}</strong>${h.note?' - '+h.note:''}</p>`).join('')||'<p>Sin historial</p>'}</div>`;openModal('viewResModal');};
function renderAgentTickets() {
  const tickets=DB.get('tickets');
  const tbody=document.getElementById('agentTicketsBody'); if(!tbody) return;
  tbody.innerHTML=tickets.map(t=>{const r=DB.get('reservations').find(x=>x.id==t.reservationId);return`<tr><td>#${t.id}</td><td>${r?getClientName(r.clientId):'-'}</td><td>${r?getFlightLabel(r.flightId):'-'}</td><td>${t.seatNumber}</td><td><span class="badge badge-boarding">${t.class}</span></td><td>${formatCurrency(t.finalPrice)}</td></tr>`;}).join('')||'<tr><td colspan="6" style="text-align:center;color:#888;">Sin tiquetes</td></tr>';
}

// ========= CLIENT PAGE =========
function initUserPage() {
  const user=requireAuth('client'); if(!user) return;
  updateProfileCard(user, 'client');
  document.querySelectorAll('.sidebar-link').forEach(link=>{
    link.addEventListener('click',function(e){e.preventDefault();document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.remove('active'));document.querySelectorAll('.tab-section').forEach(s=>s.classList.remove('active'));this.classList.add('active');const tabId=this.dataset.tab;document.getElementById(tabId).classList.add('active');if(tabId==='tab-search')renderUserFlights(user);if(tabId==='tab-my-reservations')renderUserReservations(user);if(tabId==='tab-my-tickets')renderUserTickets(user);if(tabId==='tab-packages')renderUserPackages(user);});
  });
  renderUserFlights(user); setupUserReservation(user);
}
function renderUserFlights(user) {
  const flights=DB.get('flights').filter(f=>f.status==='Programado');
  const container=document.getElementById('flightsGrid'); if(!container) return;
  container.innerHTML=flights.map(f=>{const o=DB.get('cities').find(c=>c.id==f.originCityId),d=DB.get('cities').find(c=>c.id==f.destCityId),taken=DB.get('reservations').filter(r=>r.flightId==f.id&&r.statusId!==3).length,avail=f.capacity-taken;return`<div class="flight-card-user"><div class="flight-route"><span class="city-name">${o?o.name:'-'}</span><span class="route-arrow">✈</span><span class="city-name">${d?d.name:'-'}</span></div><div class="flight-code">${f.code}</div><div class="flight-info-row"><span>🕐 Salida:</span><strong>${formatDate(f.departureDate)}</strong></div><div class="flight-info-row"><span>🛬 Llegada:</span><strong>${formatDate(f.arrivalDate)}</strong></div><div class="flight-info-row"><span>💺 Disponibles:</span><strong>${avail} / ${f.capacity}</strong></div><div class="flight-price">${formatCurrency(f.basePrice)}</div><button class="btn btn-reserve" onclick="openReserveModal(${f.id})" ${avail<=0?'disabled':''}>✈ ${avail>0?'Reservar':'Sin cupos'}</button></div>`;}).join('')||'<p style="text-align:center;color:#888;grid-column:1/-1;">No hay vuelos disponibles.</p>';
}
function setupUserReservation(user) {
  const form = document.getElementById('reserveForm'); if (!form) return;
  
  // Event listeners para actualizar resumen dinámicamente
  const ticketClassSel = document.getElementById('ticketClass');
  const pkgCheckboxes = document.querySelectorAll('.pkg-checkbox');
  
  if (ticketClassSel) ticketClassSel.addEventListener('change', updateReserveSummary);
  pkgCheckboxes.forEach(cb => cb.addEventListener('change', updateReserveSummary));
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const flightId = parseInt(this.dataset.flightId);
    const flight = DB.get('flights').find(f=>f.id == flightId);
    if (!flight) return;
    
    const ticketClass = document.getElementById('ticketClass').value;
    const seatNum = document.getElementById('seatNumber').value.trim();
    const selectedPkgIds = Array.from(document.querySelectorAll('.pkg-checkbox:checked')).map(el => parseInt(el.value));
    
    // Validar que se haya seleccionado asiento
    if (!seatNum) {
      showToast('Por favor selecciona un asiento.', 'error');
      return;
    }
    
    // Validar  que asiento no esté ocupado
    const existingTicket = DB.get('tickets').find(t => t.seatNumber === seatNum);
    if (existingTicket) {
      showToast('Este asiento ya está ocupado.', 'error');
      return;
    }
    
    const classMult = { 'Económica': 1, 'Ejecutiva': 1.5, 'Primera clase': 2.5 };
    const ticketPrice = flight.basePrice * (classMult[ticketClass] || 1);
    const pkgsTotal = selectedPkgIds.reduce((sum, pid) => {
      const p = DB.get('packages').find(x => x.id == pid);
      return sum + (p ? p.price : 0);
    }, 0);
    const totalValue = ticketPrice + pkgsTotal;
    
    const reservations = DB.get('reservations');
    const newRes = {id: genId(reservations), clientId: user.id, flightId, datetime: new Date().toISOString(), totalValue, statusId: 1};
    reservations.push(newRes);
    DB.set('reservations', reservations);
    
    const tickets = DB.get('tickets');
    tickets.push({id: genId(tickets), reservationId: newRes.id, seatNumber: seatNum, class: ticketClass, finalPrice: ticketPrice});
    DB.set('tickets', tickets);
    
    if (selectedPkgIds.length > 0) {
      const rp = DB.get('reservationPackages');
      selectedPkgIds.forEach(pid => rp.push({id: genId(rp), reservationId: newRes.id, packageId: pid}));
      DB.set('reservationPackages', rp);
    }
    
    const hist = DB.get('reservationHistory');
    hist.push({id: genId(hist), reservationId: newRes.id, statusId: 1, datetime: new Date().toISOString(), note: 'Reserva creada por cliente'});
    DB.set('reservationHistory', hist);
    
    showToast(`¡Reserva #${newRes.id} creada! Total: ${formatCurrency(totalValue)}`);
    closeModal('reserveModal');
    renderUserFlights(user);
  });
}
window.openReserveModal=function(flightId){const f=DB.get('flights').find(x=>x.id==flightId);if(!f)return;const o=DB.get('cities').find(c=>c.id==f.originCityId),d=DB.get('cities').find(c=>c.id==f.destCityId);document.getElementById('reserveFlightInfo').innerHTML=`<strong>${f.code}</strong>: ${o?o.name:'-'} → ${d?d.name:'-'}<br>📅 ${formatDate(f.departureDate)} · Desde ${formatCurrency(f.basePrice)}`;document.getElementById('reserveForm').dataset.flightId=flightId;document.getElementById('seatNumber').value='';const seatMapContainer=document.getElementById('seatMapContainer');if(seatMapContainer){seatMapContainer.innerHTML=generateSeatMap(flightId);}const availPkgs=DB.get('packages').filter(p=>p.status==='Disponible');document.getElementById('packagesCheckboxes').innerHTML=availPkgs.map(p=>`<label class="pkg-check-label"><input type="checkbox" class="pkg-checkbox" value="${p.id}" onchange="updateReserveSummary()"><span><strong>${p.name}</strong> (${p.type}) - ${formatCurrency(p.price)}<br><small>${p.description}</small></span></label>`).join('')||'<p>Sin paquetes disponibles</p>';updateReserveSummary();openModal('reserveModal');};
function renderUserReservations(user) {
  const reservations=DB.get('reservations').filter(r=>r.clientId==user.id);
  const container=document.getElementById('myReservationsList'); if(!container) return;
  container.innerHTML=reservations.map(r=>{const hist=DB.get('reservationHistory').filter(h=>h.reservationId==r.id),tickets=DB.get('tickets').filter(t=>t.reservationId==r.id),pkgLinks=DB.get('reservationPackages').filter(rp=>rp.reservationId==r.id),pkgs=pkgLinks.map(rp=>DB.get('packages').find(p=>p.id==rp.packageId)).filter(Boolean);return`<div class="reservation-card"><div class="res-header"><div><strong>Reserva #${r.id}</strong> <span class="badge ${getStatusBadgeClass(getStatusName(r.statusId))}">${getStatusName(r.statusId)}</span></div><div class="res-total">${formatCurrency(r.totalValue)}</div></div><div class="res-body"><p>✈️ <strong>${getFlightLabel(r.flightId)}</strong></p><p>📅 Fecha reserva: ${formatDate(r.datetime)}</p><p>🎫 Tiquetes: ${tickets.map(t=>`Asiento ${t.seatNumber} (${t.class})`).join(', ')||'Sin tiquetes'}</p>${pkgs.length>0?`<p>🎁 Paquetes: ${pkgs.map(p=>p.name).join(', ')}</p>`:''}</div>${hist.length>0?`<details class="history-details"><summary>📋 Historial de estados</summary>${hist.map(h=>`<p class="hist-item">📌 ${formatDate(h.datetime)} → <strong>${getStatusName(h.statusId)}</strong>${h.note?' - '+h.note:''}</p>`).join('')}</details>`:''}</div>`;}).join('')||'<p style="text-align:center;color:#888;">No tienes reservas aún. ¡Busca un vuelo y reserva!</p>';
}
function renderUserTickets(user) {
  const resIds=DB.get('reservations').filter(r=>r.clientId==user.id).map(r=>r.id),tickets=DB.get('tickets').filter(t=>resIds.includes(t.reservationId));
  const tbody=document.getElementById('myTicketsBody'); if(!tbody) return;
  tbody.innerHTML=tickets.map(t=>{const r=DB.get('reservations').find(x=>x.id==t.reservationId);return`<tr><td>#${t.id}</td><td>${r?getFlightLabel(r.flightId):'-'}</td><td>${t.seatNumber}</td><td><span class="badge badge-boarding">${t.class}</span></td><td>${formatCurrency(t.finalPrice)}</td><td>${r?`<span class="badge ${getStatusBadgeClass(getStatusName(r.statusId))}">${getStatusName(r.statusId)}</span>`:'-'}</td></tr>`;}).join('')||'<tr><td colspan="6" style="text-align:center;color:#888;">Sin tiquetes aún.</td></tr>';
}
function renderUserPackages(user) {
  const pkgs=DB.get('packages').filter(p=>p.status==='Disponible');
  const container=document.getElementById('packagesGrid'); if(!container) return;
  container.innerHTML=pkgs.map(p=>`<div class="pkg-card"><div class="pkg-type-badge">${p.type}</div><h4>${p.name}</h4><p class="pkg-dest">📍 ${p.destination}</p><p class="pkg-desc">${p.description}</p><div class="pkg-price">${formatCurrency(p.price)}</div></div>`).join('')||'<p style="text-align:center;color:#888;grid-column:1/-1;">Sin paquetes disponibles.</p>';
}

// ========= PUBLIC PAGES =========
function updateFlightsList() {
  const list=document.getElementById('flightsList'); if(!list) return;
  const flights=DB.get('flights').filter(f=>f.status==='Programado');
  list.innerHTML=flights.map(f=>{const o=DB.get('cities').find(c=>c.id==f.originCityId),
          d=DB.get('cities').find(c=>c.id==f.destCityId);
    const routeImages = {
      'Bogotá-Madrid': 'images/madrid.jpg',
      'Bogotá-Nueva York': 'images/nueva york.jpeg',
      'Medellín-Cartagena': 'images/cartagena.jpeg',
      'Bogotá-Medellín': 'images/Medellin.jpeg',
      'Cali-Buenos Aires': 'images/buenos aires agentina.jpg',
      'Bogotá-Lima': 'images/Lima.jpeg',
      'Medellín-Ciudad de México': 'images/ciudad de mexico.jpg',
      'Bogotá-Miami': 'images/miami.jpeg',
    };
    const key = `${o?o.name:''}-${d?d.name:''}`;
    const image = routeImages[key] || 'images/hero-bg.jpg';
    
    return`<div class="flight-card" style="background-image:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('${image}');background-size:cover;background-position:center;display:flex;flex-direction:column;justify-content:flex-end;min-height:300px;padding:1.5rem;position:relative;"><h4 style="color:white;margin:0.5rem 0;font-size:1.1rem;">✈ ${o?o.name:'-'} → ${d?d.name:'-'}</h4><p style="color:#f0f0f0;margin:0.2rem 0;font-size:0.85rem;"><strong>Código:</strong> ${f.code}</p><p style="color:#f0f0f0;margin:0.2rem 0;font-size:0.85rem;"><strong>Salida:</strong> ${formatDate(f.departureDate)}</p><p style="color:#f0f0f0;margin:0.2rem 0 0.4rem 0;font-size:0.85rem;"><strong>Precio:</strong> ${formatCurrency(f.basePrice)}</p><span class="badge badge-scheduled" style="display:inline-block;margin:0 0 0.6rem 0;padding:0.3rem 0.8rem;font-size:0.8rem;border-radius:20px;background:#cfe2ff;color:#0056b3;">Programado</span><a href="login.html" class="btn" style="margin-top:0;display:inline-block;width:auto;padding:0.5rem 1.2rem;font-size:0.85rem;background:#ff7a00;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;text-decoration:none;">Reservar</a></div>`;
  }).join('')||'<p style="text-align:center;">No hay vuelos disponibles.</p>';
}
function updateDiscountsList() {
  const list=document.getElementById('discountsList'); if(!list) return;
  const discounts=[
  {type:'Familias',percentage:30,description:'Descuento especial para viajes en familia',image:'images/familias.jpg'},
  {type:'Viajes Frecuentes',percentage:20,description:'Beneficios exclusivos para viajeros frecuentes',image:'images/viajes-frecuentes.jpg'},
  {type:'Estudiantes',percentage:15,description:'Tarifas especiales para estudiantes en rutas nacionales',image:'images/estudiantes.jpg'},
  {type:'Parejas',percentage:25,description:'Viaja en pareja y disfruta descuentos románticos',image:'images/parejas.jpg'},
  {type:'Temporada Baja',percentage:35,description:'Aprovecha precios reducidos en temporada baja',image:'images/temporada-baja.jpg'},
  {type:'Primera Compra',percentage:10,description:'Obtén descuento en tu primer vuelo con nosotros',image:'images/primera-compra.jpg'}
  ];
  list.innerHTML=discounts.map(d=>`<div class="discount-card"><img src="${d.image}" alt="${d.type}"><h4>${d.type}</h4><p>${d.description}</p><p><strong>Descuento: ${d.percentage}%</strong></p></div>`).join('');
}
function updateHotelsList() {
  const list=document.getElementById('hotelsList'); if(!list) return;
  const pkgs=DB.get('packages').filter(p=>p.type==='Alojamiento'&&p.status==='Disponible');
  list.innerHTML=pkgs.map(p=>`<div class="hotel-card"><h4>🏨 ${p.name}</h4><p>📍 ${p.destination}</p><p>${p.description}</p><p><strong>${formatCurrency(p.price)}</strong></p></div>`).join('')||'<p>Sin convenios disponibles.</p>';
}

function setupResponsiveMenu() {
  document.querySelectorAll('header').forEach(header=>{const nav=header.querySelector('nav');if(!nav||header.querySelector('.menu-toggle'))return;const btn=document.createElement('button');btn.className='menu-toggle';btn.setAttribute('aria-label','Toggle menu');btn.innerHTML='☰';nav.parentNode.insertBefore(btn,nav);btn.addEventListener('click',()=>header.classList.toggle('nav-open'));});
  document.addEventListener('click',(e)=>{if(!e.target.closest('header'))document.querySelectorAll('header.nav-open').forEach(h=>h.classList.remove('nav-open'));});
}

document.addEventListener('DOMContentLoaded', function() {
  initData(); setupResponsiveMenu();
  document.querySelectorAll('[data-action="logout"]').forEach(btn=>btn.addEventListener('click',logout));
  if(document.getElementById('loginForm')) initLoginPage();
  if(document.getElementById('registerForm')) initRegisterPage();
  if(document.getElementById('adminPanel')) initAdminPage();
  if(document.getElementById('agentPanel')) initAgentPage();
  if(document.getElementById('userPanel')) initUserPage();
  if(document.getElementById('flightsList')) updateFlightsList();
  if(document.getElementById('discountsList')) updateDiscountsList();
  if(document.getElementById('hotelsList')) updateHotelsList();
});
