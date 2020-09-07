const express = require ('express');
const appServer = express();

const myUser = require ('./models/user');

appServer.use(express.json());

var listUsers = []

appServer.listen (3000, ()=>{
    console.log('SERVER IS RUNNING ON PORT 3000');
});

// 1. Crear un nuevo usuario

appServer.post ('/adduser' , (req, res)=>{

    // Agregamos el usuario al arreglo

    listUsers.push(req.body)

    res.send ('POST USER ADDED');
});

// 2. Eliminar un usuario por id enviado como parámetro

appServer.post ('/deleteUser/:idUser' , (req, res)=>{
    const userid = req.params.idUser
    listUsers.forEach(function (element, index)  {
        if(element.id == userid) {
            console.log("Se elimino el usuario por ID")
            listUsers.splice(index, 1)
        }
    });
    res.send ('USER UPDATED');
});

// 3. Mostrar todos los usuarios

appServer.get ('/listaUsers',
    (req, res) => {
        res.json(listUsers)
    }
);

// 4. Traer un usuario por id enviado como parámetro

appServer.get ('/getUser/:idUser' , (req, res)=>{
    const userid = req.params.idUser
    listUsers.forEach(function (element, index)  {
        if(element.id == userid) {
            console.log("Encontro el usuario por id")
            res.json(element)
        }
    });
});

// 5. Traer un usuario por nombre enviado como parámetro

appServer.get ('/getUsername/:name' , (req, res)=>{
    const name = req.params.name
    listUsers.forEach(function (element, index)  {
        if(element.nombre == name) {
            console.log("Encontro el nombre")
            res.json(element)
        }
    });
});

// 6. Traer todos los usuarios menores a una edad enviada como parámetro


appServer.get ('/getUsersByAge/:age' , (req, res)=>{

    const age = req.params.age
    var listUsersByAge = []

    listUsers.forEach(function (element, index)  {
        if(element.edad < age) {
            listUsersByAge.push(element)
        }
    });
    res.json(listUsersByAge)
});
