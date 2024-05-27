import CardRutinas from '@/assets/styles/organisms/CardRutinas'
import Header from '@/assets/styles/navigation/Header'
import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Container from '@/assets/styles/sections/Container'
import Button from '@/assets/styles/atoms/Button'
import { getRutinasUsuario } from '@/utils/getData/rutina'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Footer from '@/assets/styles/navigation/Footer'

const Rutinas = async () => {
  const session = await auth()
  const rutinas = await getRutinasUsuario(session?.user?.id)

  if (session) {
    return (<>
      <Header session={session}/>
      <MobileShortcuts/>
      <main className={'mainSection'}>
        <Container tag={'section'}>
          <h1>Tus rutinas</h1>
          <div className={'rutinasList'}>
            {rutinas.length > 0 ? <>
                  {rutinas.map((rutina, key) => {
                    return (
                        <CardRutinas key={key} rutinaId={rutina.id} rutinaName={rutina.nombre}/>
                    )
                  })
                  }
                </>
                : <>
                  <p>No tienes rutinas</p>
                </>
            }
          </div>
          <div className={'newRutinaButton--desktop'}>
            <Button color={'primary'} size={'medium'} tag={'a'} href={'/home/rutinas/nueva-rutina'}>
              Crear nueva rutina
            </Button>
          </div>
        </Container>
        <div className={'fixedButton newRutinaButton'}>
          <Container tag={'section'}>
            <Button color={'primary'} size={'medium'} tag={'a'} href={'/home/rutinas/nueva-rutina'}>
              Crear nueva rutina
            </Button>
          </Container>
        </div>
      </main>
      <Footer/>
    </>)
  } else {
    redirect('/')
  }
}

export default Rutinas
