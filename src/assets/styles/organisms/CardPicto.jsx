import React from 'react'
import cn from 'classnames'
import styles from './CardPicto.module.css'

/**
 * CardPicto renderiza una tarjeta con un pictograma y su texto correspondiente.
 *
 * @param {string} imageUrl - La URL de la imagen a mostrar en la tarjeta.
 * @param {string} pictoName - El nombre/texto del pictograma.
 * @param {function} onClick - Función a llamar cuando se hace clic en la tarjeta.
 * @param {boolean} isSelected - Indica si la tarjeta está seleccionada.
 * @returns {JSX.Element}
 * @constructor
 */

const CardPicto = ({ imageUrl, pictoName, onClick, isSelected }) => {
  return (
      <article
          className={cn(styles.cardPicto, { [styles['cardPicto--isSelected']]: isSelected })}
          onClick={onClick}
      >
        <div className={styles.cardPicto__image}>
          <img src={imageUrl} alt={pictoName}/>
        </div>
        <div className={styles.cardPicto__name}>
          <p>{pictoName}</p>
        </div>
      </article>
  )
}

export default CardPicto
