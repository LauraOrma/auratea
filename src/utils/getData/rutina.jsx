import axios from 'axios'

// Obtener rutina especifica usuario
export const getRutina = async (usuario, rutina) => {
  return await new Promise(resolve => {
    axios(`${process.env.NEXT_PUBLIC_APIURI}api/rutina/getRutina`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      data: { idUsuario: usuario, idRutina: rutina },
    }).then(r => {
      if (!r.data.error) {
        resolve({ rutina: r.data.rutina, pictos: r.data.pictos })
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.error('Error al obtener las rutinas', err)
      resolve([])
    })
  })
}

// Obtener todas las rutinas de un usuario
export const getRutinasUsuario = async (usuario) => {
  return await new Promise(resolve => {
    axios(`${process.env.NEXT_PUBLIC_APIURI}api/rutina/getRutinasUsuario`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      data: { idUsuario: usuario },
    }).then(r => {
      if (!r.data.error) {
        resolve(r.data.rutinas)
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.error('Error al obtener las rutinas', err)
      resolve([])
    })
  })
}
