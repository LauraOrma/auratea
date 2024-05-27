'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from '@/assets/styles/sections/Slider'
import CardResource from '@/assets/styles/organisms/CardResource'

const HomeRecursos = () => {
  const [recursos, setRecursos] = useState([])

  useEffect(() => {
    async function fetchLastRecursos() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURI}api/recursos/getLastRecursos`)
        const data = response.data
        if (data.error) {
          console.error('Error fetching last resources:', data.message)
        } else {
          setRecursos(data.recursos)
        }
      } catch (error) {
        console.error('Error al obtener los últimos recursos', error)
      }
    }

    fetchLastRecursos().catch(err => console.error(err))
  }, [])

  // Asignar colores de fondo a cada recurso
  const bgColors = ['yellow', 'lightPurple', 'pink', 'darkPurple']

  return (
      <Slider>
        {recursos.map((recurso, index) => (
            <CardResource
                key={recurso.id}
                resourceTitle={recurso.titulo}
                bgColor={bgColors[index % bgColors.length]}
                resourceId={recurso.id}
                resourceImage={recurso.imagen}
            />
        ))}
      </Slider>
  )
}

export default HomeRecursos
