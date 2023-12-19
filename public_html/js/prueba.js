function validargramatica1(cadena) {

    for (let index = 0; index < cadena.length; index++) {

        if (cadena[0] > 0 && !isNaN(cadena[0])) {

            console.log(" prueba" + cadena);
        }

        else {
            console.log(" prueba errada");
        }


    }
}