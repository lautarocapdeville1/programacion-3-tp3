const cardContainer = document.querySelector('.servicios-grid');

async function getServicios () 
{
    try {
        const response = await fetch('http://localhost:3000/servicios');
        const data = await response.json();
        console.log(data);

        data.forEach((servicios) => {
            const div = document.createElement('div');
            div.classList.add('servicio');

            div.innerHTML = `
                <div class="card-img">
            
                </div>
                <div class="card-body">
                    <h5 class="card-title">${servicios.nombre}</h5>
                    <p class="card-text">${servicios.desc}</p>
                    <p class="precio">$${servicios.precio}</p>
                    <button class="btn-ver-mas" data-id="${servicios.id}">Ver más</button>
                </div>
            `;
            cardContainer.appendChild(div);
        });

        document.querySelectorAll('.btn-ver-mas').forEach((boton) => {
            boton.addEventListener('click', async () => {
                const id = boton.getAttribute('data-id');
                const response = await fetch(`http://localhost:3000/servicios/${id}`);
                const servicio = await response.json();

                document.querySelector('#modal-nombre').textContent = servicio.nombre;
                document.querySelector('#modal-desc').textContent = servicio.desc;
                document.querySelector('#modal-precio').textContent = `$${servicio.precio}`;

                document.querySelector('#modal').classList.remove('oculto');
                
                document.querySelector('#cerrar-modal').addEventListener('click', () => {
                    document.querySelector('#modal').classList.add('oculto')
})
    })
})

    }catch {
        console.log('Error al obtener los servicios');
    }

}

getServicios()