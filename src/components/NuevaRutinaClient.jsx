'use client'
import { useState } from 'react'
import Header from '@/assets/styles/navigation/Header'
import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Container from '@/assets/styles/sections/Container'
import Input from '@/assets/styles/atoms/Input'
import Button from '@/assets/styles/atoms/Button'
import RutinaGrid from '@/assets/styles/organisms/RutinaGrid'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Footer from '@/assets/styles/navigation/Footer'

const NuevaRutinaClient = ({ session }) => {
  const router = useRouter()
  const [nombreRutina, setNombreRutina] = useState('')
  const [pictos, setPictos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSaveRutina = async () => {
    setLoading(true)
    await axios(`${process.env.NEXT_PUBLIC_APIURI}api/rutina/insertRutina`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      data: { idUsuario: session?.user?.id, nombreRutina, pictos },
    }).then(r => {
      if (!r.data.error) {
        setTimeout(() => {
          router.push('/home/rutinas')
        }, 1000)
      } else {
        setLoading(false)
        console.error('Error al insertar rutina')
      }
    }).catch((err) => {
      setLoading(false)
      console.error('Error al insertar rutina', err)
    })
  }

  return (<>
    <Header session={session}/>
    <MobileShortcuts/>
    <main className="mainSection">
      <Container tag="section">
        <h1>Crear nueva rutina</h1>
        <div className="internSection addRoutine">
          <Input
              type="text"
              id="nombreRutina"
              label="Introduce el nombre para la nueva rutina"
              placeholder="Rutina 1"
              bgColor="white"
              value={nombreRutina}
              onChange={(e) => setNombreRutina(e.target.value)}
          />
        </div>
      </Container>
      <Container tag="section">
        <div className="internSection addPicto">
          <h2>Añade pictogramas a la rutina</h2>
          <RutinaGrid pictos={pictos} setPictos={setPictos}/>
        </div>
      </Container>
      <div className="fixedButton">
        <Container tag="section">
          <div className="btnGroup">
            <Button color="alternative" size="medium" tag="a" href="/home/rutinas">
              Cancelar
            </Button>
            <Button disabled={(nombreRutina === '' || !pictos.length > 0) || loading} tag="button" color="primary"
                    size="medium" onClick={() => handleSaveRutina()}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Container>
      </div>
    </main>
    <Footer/>
  </>)
}

export default NuevaRutinaClient