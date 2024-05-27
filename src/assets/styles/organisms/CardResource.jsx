import cn from 'classnames'
import styles from './CardResource.module.css'
import Link from 'next/link'

/**
 * Componente CardResource que renderiza una tarjeta con un título y una imagen
 *
 * @param {string} resourceTitle - El título del recurso a mostrar en la tarjeta.
 * @param {number | string} resourceId - El identificador del recurso, usado para determinar la imagen de fondo.
 * @param {string} bgColor - El color de fondo de la tarjeta. Opciones: 'darkPurple', 'yellow', 'lightPurple', 'pink'.
 * @returns {JSX.Element}
 * @constructor
 */

const CardResource = ({ resourceTitle, resourceId, resourceImage, bgColor }) => {

  return (
      <Link href={`/home/recursos/recurso/${resourceId}`}
            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_APIURI}recursos/${resourceImage})` }}
            className={cn(styles.cardResource, {
              [styles['cardResource--bgDarkPurple']]: bgColor === 'darkPurple',
              [styles['cardResource--bgYellow']]: bgColor === 'yellow',
              [styles['cardResource--bgLightPurple']]: bgColor === 'lightPurple',
              [styles['cardResource--bgPink']]: bgColor === 'pink',
            })}>
        <div className={cn({ [styles['cardResource__content']]: true })}>
          <h3 className={cn({ [styles['cardResource__title']]: true })}>
            {resourceTitle}
          </h3>
        </div>
      </Link>
  )
}

export default CardResource
