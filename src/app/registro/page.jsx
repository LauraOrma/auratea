import { redirect } from 'next/navigation'
import RegistroClient from '@/components/RegistroClient'
import { auth } from '@/auth'
import Container from '@/assets/styles/sections/Container'

const Registro = async () => {
  const session = await auth()

  if (session) {
    redirect(`/home`)
  } else {
    return (
        <main className={'loginSection'}>
          <Container tag={'div'}>
            <RegistroClient/>
          </Container>
        </main>
    )
  }
}

export default Registro
