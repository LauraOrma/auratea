'use client'

import { useState } from 'react'
import { Drawer } from '@mui/material'
import cn from 'classnames'
import styles from './DrawerMenu.module.css'
import stylesParent from './Header.module.css'
import Button from '../atoms/Button'
import Container from '../sections/Container'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const DrawerMenu = ({ session }) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (<>
    <div>
      <button onClick={toggleDrawer(true)}
              aria-controls={open ? 'menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              className={cn({ [stylesParent['header__avatar']]: true })}>
				<span className={'sr-only'}>
					Abrir menú con opciones de navegación
				</span>
        <span>{session?.user?.name?.charAt(0)}</span>
      </button>
      <Drawer className={cn({ [styles.drawerMenu]: true })}
              open={open}
              anchor={'right'}
              onClose={toggleDrawer(false)}>
        <div className={cn({ [styles['drawerMenu__header']]: true })}>
          <button onClick={toggleDrawer(false)} className={cn({ [styles['drawerMenu__cross']]: true })}>
            <img src="/ui/close.svg" alt="Cerrar menú"/>
          </button>
          <Container tag={'div'}>
            <div className={cn({ [styles['drawerMenu__avatar']]: true })}>
              <img src="/ui/avatar.svg" alt="Foto de perfil"/>
            </div>
            <div className={cn({ [styles['drawerMenu__headerInfo']]: true })}>
              <h3 className={cn({ [styles['drawerMenu__user']]: true })}>{session?.user?.name}</h3>
              <span className={cn({ [styles['drawerMenu__userEmail']]: true })}>{session?.user?.email}</span>
            </div>
          </Container>
        </div>

        <nav className={cn({ [styles['drawerMenu__nav']]: true })}>
          <Container tag={'section'}>
            <ul className={cn({ [styles['drawerMenu__mainNav']]: true })}>
              <li>
                <Link href="#">Perfil de usuario</Link>
              </li>
              <li>
                <Link href="#">Ajustes y privacidad</Link>
              </li>
              <li>
                <Link href="#">Ayuda</Link>
              </li>
            </ul>
          </Container>
          <Container tag={'section'}>
            <ul className={cn({ [styles['drawerMenu__secondary']]: true })}>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </Container>
        </nav>

        <div className={cn({ [styles['drawerMenu__footer']]: true })}>
          <Container tag={'section'}>
            <div className={cn({ [styles['drawerMenu__close']]: true })}>
              <Button tag={'button'} color={'light'} size={'medium'} width={'100%'} onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            </div>
          </Container>
          <Container tag={'section'}>
            <ul className={cn({ [styles['drawerMenu__legal']]: true })}>
              <li><a href="">Privacidad</a></li>
              <li><a href="">Aviso Legal</a></li>
              <li><a href="">Cookies</a></li>
            </ul>
          </Container>
        </div>
      </Drawer>
    </div>
  </>)
}

export default DrawerMenu
