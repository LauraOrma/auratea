import cn from 'classnames'
import styles from './MobileShortcuts.module.css'
import Button from '../atoms/Button'
import Container from '../sections/Container'

const MobileShortcuts = () => {

  return (<>
    <nav className={cn({ [styles.mobileShortcuts]: true })}>
      <Container tag={'div'}>
        <ul>
          <li>
            <Button color={'alternative'} size={'small'} tag={'a'} href="/home">Inicio</Button>
          </li>
          <li>
            <Button color={'alternative'} size={'small'} tag={'a'} href="/home/guia">Guía</Button>
          </li>
          <li>
            <Button color={'alternative'} size={'small'} tag={'a'} href="/home/rutinas">Rutinas</Button>
          </li>
        </ul>
      </Container>
    </nav>
  </>)
}

export default MobileShortcuts
