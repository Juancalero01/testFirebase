// Iniciar firebase
var db = firebase.firestore();


// Guardar datos
function saveDate() {
    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let edad = document.getElementById('edad').value;
    let fecha = document.getElementById('fecha').value;

    db.collection("usuario").add({
        nombre: nombre,
        tipo: tipo,
        edad: edad,
        fecha: fecha
    })
        .then(function (docref) {
            document.getElementById("form-principal").reset();
        })
        .catch(function (error) {
        })
}

// Leer datos
let tabla = document.getElementById('table-body');
db.collection("usuario").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = '';
    querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `
        <tr>
        <th scope = "row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().tipo} </td>
        <td>${doc.data().edad} </td>
        <td>${doc.data().fecha} </td>
        <td><div class="btn-group" role="group">
        <button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="fas fa-user-minus"></i>
        <button type="button" class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().tipo}','${doc.data().edad}','${doc.data().fecha}')"><i class="fas fa-user-edit"></i>
        </td>
        `
    })
})


// Borrar datos
function eliminar(id) {
    let alert = document.getElementById("alert");
    db.collection("usuario").doc(id).delete().then(function () {
        alert.innerHTML = '';
        alert.innerHTML += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Eliminado correctamente.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }).catch(function (error) {
        let alert = document.getElementById("alert");
        alert.innerHTML = '';
        alert.innerHTML += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Error al eliminar.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    })
}

// Editar datos
function editar(id, nombre, tipo, edad, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('tipo').value = tipo;
    document.getElementById('edad').value = edad;
    document.getElementById('fecha').value = fecha;
    let button = document.getElementById('btn-add')
    button.innerHTML = 'EDITAR'
    button.onclick = function () {
        let modificarRef = db.collection("usuario").doc(id);
        let nombre = document.getElementById('nombre').value;
        let tipo = document.getElementById('tipo').value;
        let edad = document.getElementById('edad').value;
        let fecha = document.getElementById('fecha').value;

        return modificarRef.update({
            nombre: nombre,
            tipo: tipo,
            edad: edad,
            fecha: fecha
        })
            .then(function () {
                let alert = document.getElementById("alert");
                alert.innerHTML = '';
                alert.innerHTML += `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">Editado correctamente.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
                button.innerHTML = 'AGREGAR'
                document.getElementById("form-principal").reset();
            })
            .catch(function () {
                let alert = document.getElementById("alert");
                alert.innerHTML = '';
                alert.innerHTML += `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Error al modificar.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
            })
    }
}



