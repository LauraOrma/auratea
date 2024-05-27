import LoginClient from '@/components/LoginClient'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Container from '@/assets/styles/sections/Container'

const Login = async () => {
  const session = await auth()

  if (session) {
    redirect(`/home`)
  } else {
    return (
        <main className={'loginSection'}>
          <Container tag={'div'}>
            <LoginClient/>
          </Container>
        </main>
    )
  }
}

export default Login
