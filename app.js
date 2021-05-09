// Iniciar firebase
var db = firebase.firestore();

// Cargar pagina con datos
window.onload = loadDate();

// Guardar datos
function saveDate() {
    let nombre = document.getElementById('nombre').value.toLowerCase();
    let tipo = document.getElementById('tipo').value;
    let edad = document.getElementById('edad').value;
    let fecha = document.getElementById('fecha').value;
    if (nombre, tipo, edad, fecha != '') {
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
                let alert = document.getElementById("alert");
                alert.innerHTML = '';
                alert.innerHTML += `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Error al guardar.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
            })
    }
    else {
        let alert = document.getElementById("alert");
        alert.innerHTML = '';
        alert.innerHTML += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Compruebe si todos los datos estan rellenados.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }

}
// Leer datos
function loadDate() {
    let tabla = document.getElementById('table-body');
    db.collection("usuario").onSnapshot(function (querySnapshot) {
        tabla.innerHTML = '';
        querySnapshot.forEach(function (doc) {
            tabla.innerHTML += `
            <tr>            
            <td>${doc.data().nombre[0].toUpperCase() + doc.data().nombre.slice(1)}</td>
            <td>${doc.data().tipo} </td>
            <td>${doc.data().edad} </td>
            <td>${doc.data().fecha} </td>
            <td><div class="btn-group" role="group">
            <button type="button" class="btn btn-danger" onclick="deleteDate('${doc.id}')"><i class="fas fa-user-minus"></i>
            <button type="button" class="btn btn-warning" onclick="editDate('${doc.id}','${doc.data().nombre}','${doc.data().tipo}','${doc.data().edad}','${doc.data().fecha}')"><i class="fas fa-user-edit"></i>
            </td>
            </tr>
            `
        })
    })
    // document.getElementById('btn-back') = '';
    // document.getElementById('buscador').value = '';
}
// Borrar datos
function deleteDate(id) {
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
function editDate(id, nombre, tipo, edad, fecha) {
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
            .catch(function (error) {
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
// Buscar datos
function searchName() {
    let nombreBuscado = document.getElementById('buscador').value.toLowerCase();
    if (nombreBuscado != '') {
        let tabla = document.getElementById('table-body');
        let volver = document.getElementById('btn-back');
        volver.innerHTML = '';
        volver.innerHTML += `
        <button class="btn btn-link" onclick="loadDate()">Volver a la tabla </button>
        `
        db.collection("usuario").where("nombre", "==", nombreBuscado)
            .get()
            .then(function (querySnapshot) {
                tabla.innerHTML = '';
                querySnapshot.forEach(function (doc) {
                    tabla.innerHTML += `
                        <tr>
                        <td>${doc.data().nombre[0].toUpperCase() + doc.data().nombre.slice(1)}</td>
                        <td>${doc.data().tipo} </td>
                        <td>${doc.data().edad} </td>
                        <td>${doc.data().fecha} </td>
                        <td><div class="btn-group" role="group">
                        <button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="fas fa-user-minus"></i>
                        <button type="button" class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().tipo}','${doc.data().edad}','${doc.data().fecha}')"><i class="fas fa-user-edit"></i>
                        </td>
                        </tr>
                        `
                });
            })
            .catch(function (error) {
                let alert = document.getElementById("alert");
                alert.innerHTML = '';
                alert.innerHTML += `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Error al buscar nombre.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
            });
    }
    else {
        let alert = document.getElementById("alert");
        alert.innerHTML = '';
        alert.innerHTML += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">Ups! Compruebe si todos los datos estan rellenados.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }
}
