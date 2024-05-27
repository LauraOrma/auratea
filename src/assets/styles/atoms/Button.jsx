import styles from './Button.module.css'
import cn from 'classnames'
import Link from 'next/link'

/**
 * El componente Button puede renderizar un elemento HTML de enlace (anchor) o un botón (button).
 *
 * @param {React.ReactNode} children - El contenido a mostrar dentro del botón.
 * @param {string} color - Color del botón. Opciones: 'primary', 'secondary', 'alternative', 'light', 'active'.
 * @param {string} size - Tamaño del botón. Opciones: 'small', 'medium', 'large'
 * @param {string} [tag='a'] - Elemento HTML a renderizar. Opciones: 'a', 'button'.
 * @param {string} [href=''] - URL a la que enlazar si el tag es 'a' (anchor).
 * @param {string} [ariaLabel=''] - Atributo "aria-label". Accesibilidad.
 * @param {string} type - Atributo "type" para un elemento button. Opciones: 'submit', 'reset', 'button'.
 * @param {string} width - Ancho del botón. Ejemplos: '100%', '200px'.
 * @param {boolean} [disabled=false] - Indica si el botón está deshabilitado o no.
 * @param {function} buttonOnSubmit - Función para formularios si el botón es de tipo submit.
 * @param {function} onClick - Función a llamar al hacer clic en el botón.
 * @returns {JSX.Element}
 * @constructor
 */


const Button = ({
                  children,
                  color,
                  size,
                  tag = 'a',
                  href = '',
                  ariaLabel = '',
                  type,
                  width,
                  disabled = false,
                  buttonOnSubmit,
                  onClick,
                }) => {
  if (tag === 'a') {
    return (
        <Link href={href} aria-label={ariaLabel} style={{ width: `${width}` }}
              className={cn({
                [styles.btn]: true,
                [styles['btn--small']]: size === 'small',
                [styles['btn--medium']]: size === 'medium',
                [styles['btn--large']]: size === 'large',
                [styles['btn--primary']]: color === 'primary',
                [styles['btn--secondary']]: color === 'secondary',
                [styles['btn--alternative']]: color === 'alternative',
                [styles['btn--light']]: color === 'light',
                [styles['btn--active']]: color === 'active',
              })}>
          {children}
        </Link>
    )
  } else {
    return (
        <button type={type} disabled={disabled} aria-label={ariaLabel} style={{ width: `${width}` }}
                className={cn({
                  [styles.btn]: true,
                  [styles['btn--small']]: size === 'small',
                  [styles['btn--medium']]: size === 'medium',
                  [styles['btn--large']]: size === 'large',
                  [styles['btn--primary']]: color === 'primary',
                  [styles['btn--secondary']]: color === 'secondary',
                  [styles['btn--alternative']]: color === 'alternative',
                  [styles['btn--light']]: color === 'light',
                  [styles['btn--active']]: color === 'active',
                })} onClick={onClick}>
          {children}
        </button>
    )
  }
}

export default Button