const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send(`
        <h1>Lista de usuarios:</h1>
        <ul>
            ${usuarios.map(usuario => `
                <li><strong>Id:</strong> ${usuario.id} 
                <strong>Nombre:</strong> ${usuario.nombre} 
                <strong>Edad:</strong> ${usuario.edad} 
                <strong>Lugar Procedencia:</strong> ${usuario.lugarProcedencia}</li>
            `).join('')}
        </ul>
        <h2>Crear Usuario:</h2>
        <form action='/usuarios' method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <br>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>
            <br>
            <label for="lugar">Lugar Procedencia:</label>
            <input type="text" id="lugar" name="lugar" required>
            <br>
            <button type="submit">Agregar usuario</button>
        </form>
        <h2>Buscar Usuario por Nombre:</h2>
        <form action='/usuarios' method="get">
            <label for="buscador">Nombre:</label>
            <input type="search" id="buscador" name="nombre" placeholder="Ingrese el nombre" required>
            <button type="submit">Buscar</button>
        </form>
    `);
});

app.get('/usuarios', (req, res) => {
    const nombreBuscado = req.query.nombre.toLowerCase();
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombreBuscado);

    if (usuarioEncontrado) {
        res.send(`
            <h1>Resultado de la búsqueda:</h1>
            <ul>
                <li><strong>Id:</strong> ${usuarioEncontrado.id}</li>
                <li><strong>Nombre:</strong> ${usuarioEncontrado.nombre}</li>
                <li><strong>Edad:</strong> ${usuarioEncontrado.edad}</li>
                <li><strong>Lugar Procedencia:</strong> ${usuarioEncontrado.lugarProcedencia}</li>
            </ul>
            <a href="/">Volver a la lista de usuarios</a>
        `);
    } else {
        res.send('<h1>No se encontraron resultados</h1><a href="/">Volver a la lista de usuarios</a>');
    }
});

//Creamos nuevos usuarios
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad:req.body.edad,
      lugarProcedencia:req.body.lugar
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
  });


app.listen(3000, () => {
    console.log('Express está escuchando en el http://localhost:3000');
});
