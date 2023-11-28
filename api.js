class ApiComponent extends HTMLElement {
    connectedCallback() {
        this.getDataFromApi();
    }

    getDataFromApi() {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => this.displayData(data))
            .catch(error => console.error(error));
    }

    displayData(data) {
        const container = document.createElement('div');

        // Mostrar el título del componente
        const title = document.createElement('h2');
        title.textContent = 'Lista de Usuarios';
        container.appendChild(title);

        // Crear una tabla
        const table = document.createElement('table');

        // Crear la fila de encabezados
        const headers = ['ID', 'Nombre', 'Usuario', 'Correo Electrónico', 'Teléfono', 'Empresa'];
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Mostrar los datos en filas
        data.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.company.name}</td>
        `;
            table.appendChild(userRow);
        });

        container.appendChild(table);
        this.appendChild(container);
    }
}

customElements.define('api-component', ApiComponent);