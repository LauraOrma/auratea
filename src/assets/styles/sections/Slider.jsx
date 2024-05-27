import styles from './Slider.module.css'
import cn from 'classnames'

const Slider = ({ children }) => {
  return (
      <section className={cn({ [styles.slider]: true })}>
        {children}
      </section>
  )
}

export default Slider
