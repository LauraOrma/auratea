import cn from 'classnames'
import styles from './CardGuide.module.css'
import Button from '../atoms/Button'

/**
 * Componente CardGuide que renderiza una tarjeta con un recurso, su descripción y un botón
 *
 * @param {string} resourceTitle - El título del recurso a mostrar en la tarjeta.
 * @param {string} resourceText - El texto descriptivo del recurso.
 * @param {string} resourceButton - El texto del botón del recurso.
 * @param {number} resourceId - El identificador del recurso, usado para determinar la imagen de fondo.
 * @param {string} bgColor - El color de fondo de la tarjeta. Opciones: 'darkPurple', 'yellow', 'lightPurple', 'pink'.
 * @returns {JSX.Element}
 * @constructor
 */

const CardGuide = ({ resourceTitle, resourceText, resourceButton, resourceId, bgColor }) => {

  return (
      <article className={cn(styles.cardGuide, {
        [styles['cardGuide--bgDarkPurple']]: bgColor === 'darkPurple',
        [styles['cardGuide--bgYellow']]: bgColor === 'yellow',
        [styles['cardGuide--bgLightPurple']]: bgColor === 'lightPurple',
        [styles['cardGuide--bgPink']]: bgColor === 'pink',
      })}>
        <div className={cn({ [styles['cardGuide__content']]: true })}>
          <h3 className={cn({ [styles['cardGuide__title']]: true })}>
            {resourceTitle}
          </h3>
          {resourceButton !== '' &&
              <p className={cn({ [styles['cardGuide__text']]: true })}>
                {resourceText}
              </p>
          }
          {resourceButton !== '' &&
              <Button color="primary" size="small" tag="a" href={'/home/guia'}>
                {resourceButton}
              </Button>
          }
        </div>
      </article>
  )
}

export default CardGuide
