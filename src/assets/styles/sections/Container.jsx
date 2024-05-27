import styles from './Container.module.css'
import cn from 'classnames'

/**
 * Container: renderiza un contenedor utilizando un elemento HTML dinámico.
 *
 * @param {string} tag - El tipo de elemento HTML a renderizar (por ejemplo, 'div', 'section', 'article').
 * @param {React.ReactNode} children - Los elementos hijos a renderizar dentro del contenedor.
 * @param {string} id - El identificador único del contenedor.
 * @returns {JSX.Element}
 * @constructor
 */

const Container = ({ tag, children, id }) => {
  const Tag = tag

  return (
      <Tag id={id} className={cn({ [styles.container]: true })}>
        {children}
      </Tag>
  )
}

export default Container
