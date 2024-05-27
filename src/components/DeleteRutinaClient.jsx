'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Button from '@/assets/styles/atoms/Button'
import { useState } from 'react'

const DeleteRutinaClient = ({ rutinaId, session }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_APIURI}api/rutina/deleteRutina`, {
        data: { idUsuario: session.id, idRutina: rutinaId },
      })
      if (response.status === 200) {
        setTimeout(() => {
          router.push('/home/rutinas')
        }, 1000)
      } else {
        setLoading(false)
        console.error('Error deleting routine:', response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error deleting routine:', error)
    }
  }

  return (
      <Button tag={'button'} size={'small'} color={'alternative'} onClick={handleDelete} disabled={loading}>
        {loading ? 'Borrando...' : 'Borrar rutina'}
      </Button>
  )
}

export default DeleteRutinaClient