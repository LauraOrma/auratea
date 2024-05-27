import Header from '@/assets/styles/navigation/Header'
import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Container from '@/assets/styles/sections/Container'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import GuiaClient from '@/components/GuiaClient'
import Footer from '@/assets/styles/navigation/Footer'

const PaginaGuia = async () => {
  const session = await auth()

  if (session) {
    return (<>
      <Header session={session}/>
      <MobileShortcuts/>
      <main className={'mainSection'}>
        <Container tag={'div'}>
          <h1>Guía de diagnóstico TEA</h1>
          <GuiaClient/>
        </Container>
      </main>
      <Footer/>
    </>)
  } else {
    redirect('/')
  }
}

export default PaginaGuia
