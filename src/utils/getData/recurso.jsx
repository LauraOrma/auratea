import axios from 'axios'

// Obtener recurso por id
export const getRecurso = async (idRecurso) => {
  return await new Promise(resolve => {
    axios(`${process.env.NEXT_PUBLIC_APIURI}api/recursos/getRecurso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { idRecurso },
    }).then(r => {
      if (!r.data.error) {
        resolve({ recurso: r.data.recurso })
      } else {
        resolve({ error: true, message: r.data.message })
      }
    }).catch((err) => {
      console.error('Error al obtener el recurso', err)
      resolve({ error: true, message: 'Error al obtener el recurso' })
    })
  })
}