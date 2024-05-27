import cn from 'classnames'
import styles from './Header.module.css'
import DrawerMenu from './DrawerMenu'
import Container from '../sections/Container'
import Link from 'next/link'

const Header = ({ session, notifications }) => {

  return (
      <div className={'header__container'}>
        <Container tag={'header'}>
          <div className={cn({ [styles.header]: true })}>
            <Link href={'/home'} className={cn({ [styles['header__brand']]: true })}>
              <span className={'sr-only'}>Ir a la página de inicio</span>
              <img src={'/brand/logotipo.png'} alt={'Logotipo de Aura TEA'}/>
            </Link>
            <section className={cn({ [styles['header__tools']]: true })}>
              <nav className={cn({ [styles['header__nav']]: true })}>
                <ul>
                  <li>
                    <Link href={'/home'}>Inicio</Link>
                  </li>
                  <li>
                    <Link href={'/home/rutinas'}>Rutinas</Link>
                  </li>
                  <li>
                    <Link href={'/home/guia'}>Guía</Link>
                  </li>
                </ul>
              </nav>
              <DrawerMenu session={session}/>
            </section>
          </div>
        </Container>
      </div>
  )
}

export default Header