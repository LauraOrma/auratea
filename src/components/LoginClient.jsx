'use client'
import Input from '@/assets/styles/atoms/Input'
import Button from '@/assets/styles/atoms/Button'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginClient = () => {
  const router = useRouter()
  const formikLogin = useFormik({
    initialValues: {
      email: '',
      pass: '',
    },
    validate: values => {
      const errors = {}
      if (!values.email) {
        errors.email = 'Introduce un correo electrónico válido'
      }
      if (!values.pass) {
        errors.pass = 'Introduce tu contraseña para continuar'
      }
      return errors
    },
    onSubmit: (values, { setSubmitting }) => {
      handleLogin(values, setSubmitting)
    },
  })

  const handleLogin = (values, setSubmitting) => {
    signIn('credentials', {
      email: values.email,
      password: values.pass,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    }).then(async r => {
      if (r && r.error) {
        console.error('Error al iniciar sesión')
      } else {
        router.push('/home')
      }
      setSubmitting(false)
    }).catch(err => {
      console.error(err)
      setSubmitting(false)
      console.error('Se ha producido algún error')
    })
  }

  return (
      <section className={'loginSection__container'}>
        <div className={'loginSection__brand'}>
          <img src="/brand/logotipo-login.svg" alt="Logotipo AuraTea"/>
        </div>
        <span className={'loginSection__claim'}>Conectando familias,<br/> iluminando caminos</span>
        <h1 className={'loginSection__title'}>Iniciar sesión</h1>

        <form onSubmit={formikLogin.handleSubmit}>
          <Input type={'email'} id={'email'} label={'Correo Electrónico'}
                 placeholder={'Correo electrónico'}
                 value={formikLogin.values.email} onBlur={formikLogin.handleBlur}
                 onChange={formikLogin.handleChange}
                 bgColor={'white'}
                 hasError={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                 errorMessage={formikLogin.touched.email && formikLogin.errors.email}
          />

          <Input type={'password'} id={'pass'} label={'Contraseña'}
                 placeholder={'Contraseña'}
                 value={formikLogin.values.pass}
                 onBlur={formikLogin.handleBlur}
                 onChange={formikLogin.handleChange}
                 bgColor={'white'}
                 hasError={formikLogin.touched.pass && Boolean(formikLogin.errors.pass)}
                 errorMessage={formikLogin.touched.pass && formikLogin.errors.pass}
          />

          <div className={'loginSection__button'}>
            <Button type={'submit'} size={'medium'} color={'primary'} disabled={formikLogin.isSubmitting} tag={'button'}
                    width={'100%'}>
              Iniciar sesión
            </Button>
          </div>
          <Link href={'/registro'}>
            ¿Todavía no tienes una cuenta? Regístrate
          </Link>

        </form>
      </section>
  )
}

export default LoginClient
