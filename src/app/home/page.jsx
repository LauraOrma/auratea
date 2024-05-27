import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Header from '@/assets/styles/navigation/Header'
import Container from '@/assets/styles/sections/Container'
import CardGuide from '@/assets/styles/organisms/CardGuide'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Footer from '@/assets/styles/navigation/Footer'
import HomeRecursos from '@/assets/styles/sections/HomeRecursos'

const Home = async () => {
  const session = await auth()

  if (session) {
    return (
        <>
          <Header session={session}/>
          <MobileShortcuts/>
          <main>
            <Container tag={'div'}>
              <section className={'resourceSection'}>
                <h2>Guía de diagnóstico TEA</h2>
                <CardGuide resourceTitle={'¿Quieres aprender más sobre el TEA?'}
                           resourceText={'Si acaban de diagnosticar a tu hijo o hija con TEA o si piensas que va a ser diagnosticado o diagnosticada te podemos ayudar para hacer el proceso un poco más fácil'}
                           bgColor={'darkPurple'} resourceButton={'Comenzar la guía'} resourceId={'1'}/>
              </section>
              <section className={'resourceSection'}>
                <h2>Las charlas del mes</h2>
                <HomeRecursos/>
              </section>

            </Container>
          </main>
          <Footer/>
        </>
    )
  } else {
    redirect('/')
  }
}

export default Home
