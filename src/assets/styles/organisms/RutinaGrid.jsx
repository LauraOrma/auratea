import cn from 'classnames'
import styles from './RutinaGrid.module.css'
import ModalPicto from './ModalPicto'
import CardPicto from './CardPicto'
import TextoAVoz from '@/components/TextoAVoz'

const RutinaGrid = ({ pictos, setPictos }) => {

  const texts = pictos.map(picto => picto.texto)

  return (
      <section className={cn(styles.rutinaGrid)}>
        <ModalPicto pictos={pictos} setPictos={setPictos}/>
        {pictos.map((pictogram, index) => {
          return (
              <CardPicto key={index} imageUrl={pictogram.imageUrl} pictoName={pictogram.text}/>
          )
        })}
        <TextoAVoz texts={pictos.map(picto => picto.text)}/>
      </section>
  )
}

export default RutinaGrid
