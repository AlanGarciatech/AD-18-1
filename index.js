// Tarea 1, 2 y 3
async function fetchColorsList() {
  try {
    const response = await fetch('https://reqres.in/api/unknown', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.status}`);
    }

    const result = await response.json();

    clearList(); 
    result.data.forEach(color => addItem(color));

    localStorage.setItem('colorsList', JSON.stringify(result.data));
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
}

// Tarea 2 Mostrar los colores 
function addItem(color) {
  const container = document.getElementById('list-items');
  const item = document.createElement('div');
  item.className = 'card my-2 p-2';
  item.innerHTML = `
    <h5>${color.name}</h5>
    <p>Color: ${color.color}</p>
    <div style="width: 100px; height: 30px; background-color: ${color.color};"></div>
  `;
  container.appendChild(item);
}

// Tarea 4 Cargar desde el almacenamiento del localStorage
function loadColorsFromStorage() {
  const storedColors = localStorage.getItem('colorsList');
  if (storedColors) {
    const colors = JSON.parse(storedColors);
    console.log('Colores cargados desde localStorage:', colors);
    clearList();
    colors.forEach(color => addItem(color));
  } else {
    console.warn('No hay colores guardados en localStorage.');
  }
}

// Tarea 5: Elimine todos los elemntos de la lista 
function clearList() {
  document.getElementById('list-items').innerHTML = '';
}

// Tarea 6: Conectar botones
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('load-api').addEventListener('click', fetchColorsList);
  document.getElementById('load-storage').addEventListener('click', loadColorsFromStorage);
  document.getElementById('clear-list').addEventListener('click', clearList);
});







