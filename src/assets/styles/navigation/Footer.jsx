import cn from 'classnames'
import styles from './Footer.module.css'
import Container from '../sections/Container'

const Footer = () => {

  return (
      <div style={{ marginTop: '8rem' }}>
        <img style={{ position: 'relative', zIndex: '10' }} src="/images/decoration/deco-footer.svg"
             alt="Imagen decorativa"/>
        <footer className={cn({ [styles.footer]: true })}>
          <Container tag={'div'}>
            <div className={cn({ [styles['footer__brand']]: true })}>
              <img src="/brand/logotipo-footer.svg" alt=""/>
            </div>
            <nav className={cn({ [styles['footer__nav']]: true })}>
              <ul>
                <li>
                  <a href="/home">Inicio</a>
                </li>
                <li>
                  <a href="/home/recursos">Recursos</a>
                </li>
                <li>
                  <a href="/home/guia">Guía</a>
                </li>
                <li>
                  <a href="/home/rutinas">Rutinas</a>
                </li>
              </ul>
            </nav>
          </Container>
        </footer>
      </div>
  )
}

export default Footer
