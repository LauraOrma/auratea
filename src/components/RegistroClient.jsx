'use client'
import Input from '@/assets/styles/atoms/Input'
import Button from '@/assets/styles/atoms/Button'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const LoginClient = () => {
  const router = useRouter()
  const formikRegistro = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      pass: '',
      fNacimiento: new Date(),
    },
    validate: values => {
      const errors = {}
      if (!values.nombre) {
        errors.nombre = 'Introduce tu nombre para continuar'
      }
      if (!values.email) {
        errors.email = 'Introduce un correo electrónico válido'
      }
      if (!values.pass) {
        errors.pass = 'Introduce tu contraseña para continuar'
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting }) => {
      await registrarUsuario(values, setSubmitting)
    },
  })

  const registrarUsuario = async (values, setSubmitting) => {
    await axios(`${process.env.NEXT_PUBLIC_APIURI}api/registro`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, data: values,
    }).then(r => {
      if (r.status === 200) {
        router.push('/')
      } else {
        console.error('Error al registrar usuario')
      }
    }).catch(err => {
      console.error('Error al registrar al usuario', err)
    })

    setSubmitting(false)
  }

  return (<section className={'loginSection__container'}>
        <div className={'loginSection__brand'}>
          <img src="/brand/logotipo-login.svg" alt="Logotipo AuraTea"/>
        </div>
        <span className={'loginSection__claim'}>Conectando familias,<br/> iluminando caminos</span>
        <h1 className={'loginSection__title'}>Registro de usuario</h1>
        <form onSubmit={formikRegistro.handleSubmit}>
          <Input type={'text'} id={'nombre'} label={'Nombre'} placeholder={'Nombre'}
                 value={formikRegistro.values.nombre}
                 onBlur={formikRegistro.handleBlur} onChange={formikRegistro.handleChange} bgColor={'white'}
                 hasError={formikRegistro.touched.nombre && Boolean(formikRegistro.errors.nombre)}
                 errorMessage={formikRegistro.touched.nombre && formikRegistro.errors.nombre}/>

          <Input type={'email'} id={'email'} label={'Correo Electrónico'}
                 placeholder={'Correo electrónico'}
                 value={formikRegistro.values.email} onBlur={formikRegistro.handleBlur}
                 onChange={formikRegistro.handleChange}
                 bgColor={'white'}
                 hasError={formikRegistro.touched.email && Boolean(formikRegistro.errors.email)}
                 errorMessage={formikRegistro.touched.email && formikRegistro.errors.email}
          />

          <Input type={'password'} id={'pass'} label={'Contraseña'}
                 placeholder={'Contraseña'}
                 value={formikRegistro.values.pass}
                 onBlur={formikRegistro.handleBlur}
                 onChange={formikRegistro.handleChange}
                 bgColor={'white'}
                 hasError={formikRegistro.touched.pass && Boolean(formikRegistro.errors.pass)}
                 errorMessage={formikRegistro.touched.pass && formikRegistro.errors.pass}
          />

          <Input type={'date'} id={'fNacimiento'} label={'Fecha de nacimiento'} placeholder={'Fecha de nacimiento'}
                 bgColor={'white'} value={formikRegistro.values.fNacimiento} onChange={formikRegistro.handleChange}
                 onBlur={formikRegistro.handleBlur}
                 hasError={formikRegistro.touched.fNacimiento && Boolean(formikRegistro.errors.fNacimiento)}
                 errorMessage={formikRegistro.touched.fNacimiento && formikRegistro.errors.fNacimiento}/>

          <div className={'loginSection__button'}>
            <Button size={'medium'} type={'submit'} color={'primary'} disabled={formikRegistro.isSubmitting}
                    tag={'button'}
                    width={'100%'}>
              Registrarse
            </Button>
            <Link href={'/'}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </section>
  )
}

export default LoginClient
