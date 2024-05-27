import Header from '@/assets/styles/navigation/Header'
import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Container from '@/assets/styles/sections/Container'
import { getRutina } from '@/utils/getData/rutina'
import CardPicto from '@/assets/styles/organisms/CardPicto'
import { redirect } from 'next/navigation'
import TextoAVoz from '@/components/TextoAVoz'
import RutinaPlayer from '@/assets/styles/organisms/RutinaPlayer'
import Button from '@/assets/styles/atoms/Button'
import { auth } from '@/auth'
import Footer from '@/assets/styles/navigation/Footer'
import DeleteRutinaClient from '@/components/DeleteRutinaClient'

const Rutina = async ({ params: { id } }) => {
  const session = await auth()
  const data = await getRutina(session?.user?.id, id)
  const { rutina, pictos } = data

  if (session) {
    const rutinaData = rutina[0]

    return (<>
      <Header session={session}/>
      <MobileShortcuts/>
      <main className={'mainSection'}>
        <Container tag={'section'}>
          <div className={'rutinaPage__header'}>
            <h1>{rutinaData.nombre}</h1>
            <div style={{ paddingBottom: '1.5rem' }}>
              <DeleteRutinaClient session={session} rutinaId={rutinaData.id}/>
            </div>
          </div>
          <RutinaPlayer>
            {pictos.length > 0
                ? <>
                  {pictos.map((picto, index) => {
                    return (
                        <CardPicto
                            key={index}
                            imageUrl={picto.imagen}
                            pictoName={picto.texto}
                        />
                    )
                  })}
                  <TextoAVoz texts={pictos.map(picto => picto.texto)}/>
                </>
                : <>
                  <p>No hay rutinas</p>
                </>
            }
          </RutinaPlayer>
          <Button tag={'a'} size={'medium'} color={'alternative'} href={'/home/rutinas'}>Volver a mis rutinas</Button>
        </Container>
      </main>
      <Footer/>
    </>)
  } else {
    redirect('/')
  }
}

export default Rutina
