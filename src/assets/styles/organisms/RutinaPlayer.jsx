import cn from 'classnames'
import styles from './RutinaPlayer.module.css'

const RutinaPlayer = ({ children }) => {

  return (
      <section className={cn(styles.rutinaPlayer)}>
        {children}
      </section>
  )
}

export default RutinaPlayer
