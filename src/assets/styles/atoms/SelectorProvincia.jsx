'use client'
import provincias from '@/utils/provincias.json'
import cn from 'classnames'
import styles from './SelectorProvincia.module.css'

const SelectorProvincia = ({ setProvincia }) => {

  return (
      <select className={cn({ [styles.selectorProvincia]: true })}
              onChange={(e) => setProvincia(e.target.value)}>
        <option value="">Selecciona una provincia</option>
        {provincias.map((provincia, index) => {
              return (
                  <option key={index} value={provincia.code}>
                    {provincia.label}
                  </option>
              )
            },
        )}
      </select>
  )
}

export default SelectorProvincia
