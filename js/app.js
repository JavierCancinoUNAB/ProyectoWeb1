/**
 * Archivo principal de JavaScript para el Libro de Clases Virtual
 * Maneja la carga de datos, formularios de asistencia y generación de reportes
 *
 * NOTA IMPORTANTE - DATOS MOCK HARDCODEADOS:
 * ==========================================
 * Esta versión utiliza datos de prueba hardcodeados para facilitar el desarrollo y testing.
 * Los datos mock incluyen 12 estudiantes de jardín de infantes con información completa.
 *
 * Para producción:
 * - Reemplazar la función cargarEstudiantes() con carga desde API/servidor
 * - Implementar manejo de errores real
 * - Agregar validación de datos del servidor
 * - Considerar implementar caché local con service workers
 */

// Variables globales
let estudiantes = []; // Array para almacenar los datos de estudiantes
let asistencia = {}; // Objeto para almacenar los registros de asistencia por fecha

/**
 * Función que se ejecuta cuando el DOM está completamente cargado
 * Inicializa la aplicación cargando estudiantes y asistencia
 */
document.addEventListener('DOMContentLoaded', function() {
  mostrarCargaGlobal();
  inicializarAplicacion();
});

/**
 * Inicializa la aplicación con todas las configuraciones
 */
function inicializarAplicacion() {
  // Simular tiempo de carga inicial
  setTimeout(() => {
    cargarEstudiantes();
    cargarAsistencia();
    inicializarTooltips();
    inicializarAnimaciones();
    ocultarCargaGlobal();

    mostrarToast('¡Bienvenido a Kinder Manager! 🎉', 'success');
  }, 1500);
}

/**
 * Muestra el indicador de carga global
 */
function mostrarCargaGlobal() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

/**
 * Oculta el indicador de carga global
 */
function ocultarCargaGlobal() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

/**
 * Inicializa tooltips de Bootstrap
 */
function inicializarTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

/**
 * Inicializa animaciones escalonadas
 */
function inicializarAnimaciones() {
  // Agregar animaciones escalonadas a las cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Smooth scroll para navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Carga los datos de estudiantes usando datos mock hardcodeados
 * NOTA: Estos son datos de prueba hardcodeados para desarrollo
 * En producción, reemplazar con carga desde servidor/API
 */
function cargarEstudiantes() {
  const contenedor = document.getElementById('students-container');
  // Mostrar indicador de carga
  contenedor.innerHTML = '<div class="text-center"><div class="loading"></div> <p>Cargando alumnos...</p></div>';

  // Simular tiempo de carga para mejor UX (opcional)
  setTimeout(() => {
    // DATOS MOCK HARDCODEADOS - PARA DESARROLLO Y TESTING
    // En producción, estos datos vendrían de una base de datos o API
    // NOTA: Ahora usando imágenes reales proporcionadas por el usuario
    estudiantes = [
      {
        id: 1,
        name: "Martin Contador",
        age: 5,
        photo: "images/Chinchilla de la Sabiduria.png"
      },
      {
        id: 2,
        name: "Jose Jimenez",
        age: 4,
        photo: "images/Joe.png"
      },
      {
        id: 3,
        name: "Nicolas Cheuque",
        age: 5,
        photo: "images/Lulu.png"
      },
      {
        id: 4,
        name: "Benjamin Vivanco",
        age: 4,
        photo: "images/Snoopy.png"
      },
      {
        id: 5,
        name: "Cesar Cheuque",
        age: 5,
        photo: "images/token_3 (2).png"
      },
      {
        id: 6,
        name: "Vincent Depassier",
        age: 4,
        photo: "images/token_4 (4).png"
      },
      {
        id: 7,
        name: "Felipe Chavez",
        age: 5,
        photo: "images/token_6.png"
      },
      {
        id: 8,
        name: "Mariendo Mendez",
        age: 4,
        photo: "images/Chinchilla de la Sabiduria.png" // Reutilizando imagen
      },
      {
        id: 9,
        name: "Brenda Morales",
        age: 5,
        photo: "images/Joe.png" // Reutilizando imagen
      },
      {
        id: 10,
        name: "Martin Contador",
        age: 4,
        photo: "images/Lulu.png" // Reutilizando imagen
      },
      {
        id: 11,
        name: "Jose Jimenez",
        age: 5,
        photo: "images/Snoopy.png" // Reutilizando imagen
      },
      {
        id: 12,
        name: "Nicolas Cheuque",
        age: 4,
        photo: "images/token_3 (2).png" // Reutilizando imagen
      }
    ];

    // Simular carga exitosa
    mostrarEstudiantes();
    mostrarToast('Datos mock cargados exitosamente', 'success');
  }, 1000); // Simular 1 segundo de carga
}

/**
 * Muestra la lista de estudiantes en tarjetas
 * Crea una tarjeta para cada estudiante con su información
 */
function mostrarEstudiantes() {
  const contenedor = document.getElementById('students-container');
  contenedor.innerHTML = ''; // Limpiar contenedor

  estudiantes.forEach(estudiante => {
    // Crear elemento de tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'col-md-4 mb-4 fade-in';

    // Contenido HTML de la tarjeta
    tarjeta.innerHTML = `
      <div class="card h-100">
        <img src="${estudiante.photo}" class="card-img-top" alt="${estudiante.name}"
             onerror="this.src='https://via.placeholder.com/300x200/FFB6C1/FFFFFF?text=${encodeURIComponent(estudiante.name)}'">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title"><i class="bi bi-person-circle"></i> ${estudiante.name}</h5>
          <p class="card-text"><i class="bi bi-cake"></i> Edad: ${estudiante.age} años</p>
          <button class="btn btn-primary mt-auto" onclick="verEstudiante(${estudiante.id})">
            <i class="bi bi-eye"></i> Ver Detalles
          </button>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

/**
 * Muestra los detalles de un estudiante en un modal
 * @param {number} id - ID del estudiante a mostrar
 */
function verEstudiante(id) {
  const estudiante = estudiantes.find(e => e.id === id);
  if (estudiante) {
    // Llenar los elementos del modal con datos del estudiante
    document.getElementById('student-name').textContent = estudiante.name;
    document.getElementById('student-age').textContent = estudiante.age;
    document.getElementById('student-photo').src = estudiante.photo;

    // Mostrar modal usando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('studentModal'));
    modal.show();
  } else {
    mostrarToast('Estudiante no encontrado', 'warning');
  }
}

/**
 * Carga los registros de asistencia desde localStorage
 * Si no hay datos, inicializa con datos de ejemplo para testing
 */
function cargarAsistencia() {
  const datosGuardados = localStorage.getItem('attendance');
  if (datosGuardados) {
    try {
      asistencia = JSON.parse(datosGuardados);
    } catch (error) {
      console.error('Error al parsear datos de asistencia:', error);
      asistencia = {};
    }
  } else {
    // DATOS DE EJEMPLO PARA TESTING - MOCK DATA
    // En producción, estos datos vendrían del servidor
    const fechaEjemplo = new Date().toISOString().split('T')[0]; // Fecha de hoy

    asistencia = {};
    asistencia[fechaEjemplo] = [
      { id: 1, name: "Martin Contador", status: "present", observation: "" },
      { id: 2, name: "Jose Jimenez", status: "present", observation: "" },
      { id: 3, name: "Nicolas Cheuque", status: "absent", observation: "Resfriado" },
      { id: 4, name: "Benjamin Vivanco", status: "present", observation: "" },
      { id: 5, name: "Cesar Cheuque", status: "present", observation: "" },
      { id: 6, name: "Vincent Depassier", status: "absent", observation: "Cita médica" },
      { id: 7, name: "Felipe Chavez", status: "present", observation: "" },
      { id: 8, name: "Mariendo Mendez", status: "present", observation: "" },
      { id: 9, name: "Brenda Morales", status: "absent", observation: "Vacaciones familiares" },
      { id: 10, name: "Martin Contador", status: "present", observation: "" },
      { id: 11, name: "Jose Jimenez", status: "present", observation: "" },
      { id: 12, name: "Nicolas Cheuque", status: "present", observation: "" }
    ];

    // Guardar los datos de ejemplo
    guardarAsistencia();
    mostrarToast('Datos de ejemplo cargados para testing', 'info');
  }
}

/**
 * Guarda los registros de asistencia en localStorage
 */
function guardarAsistencia() {
  try {
    localStorage.setItem('attendance', JSON.stringify(asistencia));
  } catch (error) {
    console.error('Error al guardar asistencia:', error);
    mostrarToast('Error al guardar los datos', 'danger');
  }
}

/**
 * Muestra el formulario de registro de asistencia para una fecha específica
 * Valida que se haya seleccionado una fecha
 */
function mostrarFormularioAsistencia() {
  const fecha = document.getElementById('attendance-date').value;
  if (!fecha) {
    mostrarToast('Por favor selecciona una fecha', 'warning');
    return;
  }

  const contenedor = document.getElementById('attendance-container');
  // Mostrar indicador de carga temporal
  contenedor.innerHTML = '<tr><td colspan="3" class="text-center"><div class="loading"></div> <p>Generando formulario...</p></td></tr>';

  // Simular tiempo de carga para mejor UX
  setTimeout(() => {
    contenedor.innerHTML = ''; // Limpiar contenedor

    estudiantes.forEach(estudiante => {
      // Crear fila para cada estudiante
      const fila = document.createElement('tr');
      fila.className = 'fade-in';

      fila.innerHTML = `
        <td><i class="bi bi-person"></i> ${estudiante.name}</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="attendance-${estudiante.id}" value="present" checked>
            <label class="form-check-label"><i class="bi bi-check-circle text-success"></i> Presente</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="attendance-${estudiante.id}" value="absent">
            <label class="form-check-label"><i class="bi bi-x-circle text-danger"></i> Ausente</label>
          </div>
        </td>
        <td>
          <textarea class="form-control observation" id="obs-${estudiante.id}"
                    placeholder="Observación si ausente" disabled rows="2"></textarea>
        </td>
      `;

      contenedor.appendChild(fila);

      // Agregar event listeners para habilitar/deshabilitar observaciones
      fila.querySelectorAll(`input[name="attendance-${estudiante.id}"]`).forEach(radio => {
        radio.addEventListener('change', function() {
          const observacion = document.getElementById(`obs-${estudiante.id}`);
          observacion.disabled = this.value === 'present';
          if (this.value === 'present') {
            observacion.value = ''; // Limpiar observación si está presente
          }
        });
      });
    });

    // Mostrar la sección de asistencia
    document.getElementById('attendance-section').style.display = 'block';
  }, 500); // Retraso de 500ms para mejor UX
}

/**
 * Guarda el registro de asistencia para la fecha seleccionada
 * Valida que se hayan completado las observaciones para ausentes
 */
function guardarRegistroAsistencia() {
  const fecha = document.getElementById('attendance-date').value;
  const registros = [];

  // Recopilar datos de cada estudiante
  estudiantes.forEach(estudiante => {
    const estado = document.querySelector(`input[name="attendance-${estudiante.id}"]:checked`).value;
    const observacion = document.getElementById(`obs-${estudiante.id}`).value;

    registros.push({
      id: estudiante.id,
      name: estudiante.name,
      status: estado,
      observation: observacion
    });
  });

  // Validar observaciones para estudiantes ausentes
  const ausentesSinObservacion = registros.filter(r => r.status === 'absent' && !r.observation.trim());
  if (ausentesSinObservacion.length > 0) {
    mostrarToast('Debes agregar observaciones para todos los alumnos ausentes', 'danger');
    return;
  }

  // Guardar registros en el objeto de asistencia
  asistencia[fecha] = registros;
  guardarAsistencia();

  // Mostrar modal de confirmación
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();

  // Limpiar formulario después de guardar
  setTimeout(() => {
    document.getElementById('attendance-section').style.display = 'none';
    document.getElementById('attendance-date').value = '';
  }, 2000);
}

/**
 * Genera y muestra el reporte diario para una fecha específica
 * Incluye resumen de presentes/ausentes y lista detallada
 */
function generarReporte() {
  const fecha = document.getElementById('report-date').value;
  if (!fecha) {
    mostrarToast('Por favor selecciona una fecha para el reporte', 'warning');
    return;
  }

  if (!asistencia[fecha]) {
    mostrarToast('No hay registros de asistencia para esta fecha', 'warning');
    return;
  }

  const registros = asistencia[fecha];
  const presentes = registros.filter(r => r.status === 'present').length;
  const ausentes = registros.filter(r => r.status === 'absent').length;

  // Crear resumen del reporte
  const resumen = document.getElementById('report-summary');
  resumen.innerHTML = `
    <h4><i class="bi bi-calendar"></i> Reporte del ${fecha}</h4>
    <div class="row text-center">
      <div class="col-md-6">
        <div class="alert alert-success">
          <h5><i class="bi bi-check-circle"></i> Presentes</h5>
          <h2>${presentes}</h2>
        </div>
      </div>
      <div class="col-md-6">
        <div class="alert alert-danger">
          <h5><i class="bi bi-x-circle"></i> Ausentes</h5>
          <h2>${ausentes}</h2>
        </div>
      </div>
    </div>
  `;

  // Crear lista detallada
  const lista = document.getElementById('report-list');
  lista.innerHTML = '';

  registros.forEach(registro => {
    const elemento = document.createElement('li');
    elemento.className = `list-group-item fade-in ${registro.status === 'present' ? 'list-group-item-success' : 'list-group-item-danger'}`;

    elemento.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong><i class="bi bi-person"></i> ${registro.name}</strong>
          ${registro.observation ? `<br><small><i class="bi bi-pencil"></i> ${registro.observation}</small>` : ''}
        </div>
        <span class="badge ${registro.status === 'present' ? 'bg-success' : 'bg-danger'}">
          <i class="bi ${registro.status === 'present' ? 'bi-check' : 'bi-x'}"></i>
          ${registro.status === 'present' ? 'Presente' : 'Ausente'}
        </span>
      </div>
    `;

    lista.appendChild(elemento);
  });

  // Mostrar sección de reporte y hacer scroll
  document.getElementById('report-section').style.display = 'block';
  document.getElementById('report-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Muestra un toast (notificación) con un mensaje mejorado
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - El tipo de toast (success, danger, warning, info)
 * @param {number} duracion - Duración en milisegundos (opcional)
 */
function mostrarToast(mensaje, tipo, duracion = 5000) {
  // Crear contenedor de toasts si no existe
  let contenedorToast = document.getElementById('toast-container');
  if (!contenedorToast) {
    contenedorToast = document.createElement('div');
    contenedorToast.id = 'toast-container';
    contenedorToast.className = 'toast-container position-fixed top-0 end-0 p-3';
    contenedorToast.style.zIndex = '1050';
    document.body.appendChild(contenedorToast);
  }

  // Crear elemento toast
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${tipo} border-0 shadow-lg`;
  toast.setAttribute('role', 'alert');

  // Iconos según el tipo
  const iconos = {
    success: 'bi-check-circle-fill',
    danger: 'bi-exclamation-triangle-fill',
    warning: 'bi-exclamation-circle-fill',
    info: 'bi-info-circle-fill'
  };

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center">
        <i class="bi ${iconos[tipo] || 'bi-info-circle'} me-2 fs-5"></i>
        <div>
          <div class="fw-bold">${mensaje}</div>
          ${tipo === 'success' ? '<small>Operación completada</small>' : ''}
        </div>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  // Agregar toast al contenedor
  contenedorToast.appendChild(toast);

  // Inicializar y mostrar toast con Bootstrap
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  // Remover toast después del tiempo especificado
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, duracion);
}

/**
 * Muestra estadísticas rápidas de asistencia
 */
function mostrarEstadisticasRapidas() {
  const fechaHoy = new Date().toISOString().split('T')[0];
  const registros = asistencia[fechaHoy];

  if (!registros) {
    mostrarToast('No hay registros para hoy', 'info');
    return;
  }

  const presentes = registros.filter(r => r.status === 'present').length;
  const ausentes = registros.filter(r => r.status === 'absent').length;
  const total = registros.length;

  mostrarToast(`📊 Hoy: ${presentes} presentes, ${ausentes} ausentes de ${total} totales`, 'info', 8000);
}

/**
 * Función para limpiar todos los datos de asistencia (útil para testing)
 * Reinicia con datos de ejemplo
 */
function limpiarDatosAsistencia() {
  if (confirm('¿Estás seguro de que quieres eliminar todos los registros de asistencia?')) {
    localStorage.removeItem('attendance');
    asistencia = {};
    mostrarToast('Datos de asistencia eliminados', 'warning');

    // Recargar datos de ejemplo después de un breve delay
    setTimeout(() => {
      cargarAsistencia();
    }, 1000);
  }
}
