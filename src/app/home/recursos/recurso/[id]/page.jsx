import Header from '@/assets/styles/navigation/Header'
import MobileShortcuts from '@/assets/styles/navigation/MobileShortcuts'
import Container from '@/assets/styles/sections/Container'
import { getRecurso } from '@/utils/getData/recurso'
import Footer from '@/assets/styles/navigation/Footer'
import { auth } from '@/auth'
import MarkdownRenderer from '@/components/MarkdownRenderer'

const Recurso = async ({ params: { id } }) => {
  const session = await auth()
  const data = await getRecurso(id)
  const { recurso } = data

  return (<>
    <Header session={session}/>
    <MobileShortcuts/>
    <main className={'mainSection'}>
      <Container tag={'article'}>
        <div className={'recursoPage'}>
          <MarkdownRenderer markdown={recurso.texto}/>
          <div className={'recursoPage__image'}>
            <img src={`${process.env.NEXT_PUBLIC_APIURI}recursos/${recurso.imagen}`} alt={recurso.titulo}/>
          </div>
        </div>
      </Container>
    </main>
    <Footer/>
  </>)
}

export default Recurso