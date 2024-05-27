import styles from './Input.module.css'
import cn from 'classnames'

/**
 * Componente Input que puede renderizar un elemento input, un elemento textarea o un elemento checkbox.
 *
 * @param {string} placeholder - El texto de marcador de posición del input.
 * @param {string} id - El identificador único del input.
 * @param {string} type - El tipo de input. Opciones: 'text', 'password', 'email', 'textarea', 'checkbox', etc.
 * @param {boolean} required - Si el input es obligatorio.
 * @param {string} label - Etiqueta asociada al input. Accesibilidad.
 * @param {string} bgColor - Color de fondo del elemento. Opciones: 'white', 'grey'.
 * @param {string} value - El valor actual del elemento.
 * @param {function} onChange - Función a llamar cuando el valor del input cambia.
 * @param {function} onBlur - Función a llamar cuando el input pierde el foco.
 * @param {string} errorMessage - Mensaje de error a mostrar si hay un error.
 * @param {boolean} hasError - Si el input tiene un error.
 * @returns {JSX.Element}
 * @constructor
 */

const Input = ({
                 label,
                 placeholder,
                 id,
                 type,
                 required,
                 bgColor,
                 value,
                 onChange,
                 onBlur,
                 errorMessage,
                 hasError,
               }) => {

  if (type === 'checkbox') {
    return (
        <label>
          <input id={id} name={id} type={type} required={required} onChange={onChange} onBlur={onBlur}/> {label}
        </label>
    )
  } else if (type === 'textarea') {
    return (
        <>
          <label className="sr-only" htmlFor={id}>{label}</label>
          <textarea
              id={id}
              name={id}
              required={required}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              className={cn(styles.textarea, {
                [styles['input--bgWhite']]: bgColor === 'white',
                [styles['input--bgGrey']]: bgColor === 'grey',
              })}
          />
        </>
    )
  } else {
    return (
        <>
          <label htmlFor={id}>
            {label}
          </label>
          <input
              className={cn(styles.input, {
                [styles['input--bgWhite']]: bgColor === 'white',
                [styles['input--bgGrey']]: bgColor === 'grey',
                [styles['input--error']]: hasError === true,
              })}
              placeholder={placeholder}
              id={id}
              name={id}
              type={type}
              required={required}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
          />
          {hasError &&
              <span className={styles.errorMessage}>
                        {errorMessage}
                    </span>
          }
        </>
    )
  }
}

export default Input
