import cn from 'classnames' // Importamos el paquete de classnames
import styles from './CardRutinas.module.css' // Importamos los estilos del componente
import Image from 'next/image' // Importamos el componente Image de Next.js
import Link from 'next/link' // Importamos el componente Link de Next.js
//Imágenes importadas
import arrowRight from '/public/ui/arrow-right.svg'

/**
 * Componente CardRutinas: renderiza una tarjeta de rutina ya existente con el nombre de la rutina y el id de la rutina
 * que enlaza a la página de la rutina en cuestión.
 *
 * @param {string} rutinaId - El identificador único de la rutina.
 * @param {string} rutinaName - El nombre de la rutina.
 * @returns {JSX.Element}
 * @constructor
 */

const CardRutinas = ({ rutinaId, rutinaName }) => {

  return (
      <Link href={`/home/rutinas/rutina/${rutinaId}`} className={cn({ [styles.cardRutinas]: true })}>
        <h2 className={cn({ [styles['cardRutinas__name']]: true })}>{rutinaName}</h2>
        <div className={cn({ [styles['cardRutinas__cta']]: true })}>
          <p className={cn({ [styles['cardRutinas__text']]: true })}>
            Ver
          </p>
          <Image src={arrowRight} alt={'Icono flecha'} className={cn({ [styles['cardRutinas__icon']]: true })}/>
        </div>
      </Link>
  )
}

export default CardRutinas
