export const filtrarDatos = (datos) => {
    var curso = '';
    var fecha = '';
    var alumnos = [];

    return new Promise((resolve, reject) => {
        try {
            curso = datos[0][0].split(' ')[2];
            fecha = datos[2][1];
            fecha = new Date(fecha);

            for (var i = 3; i < datos.length; i++) {
                const nombre = datos[i][0];
                var asistencia = false;
                if (datos[i].length > 1) {
                    if (datos[i][1].length == 1) {
                        asistencia = true;
                    }
                }
                const alumno = { nombre: nombre, asistencia: asistencia };
                alumnos.push(alumno);
            }

            resolve({ curso, fecha, alumnos });

        } catch (err) {
            reject(Error(err));
        }

    });
};