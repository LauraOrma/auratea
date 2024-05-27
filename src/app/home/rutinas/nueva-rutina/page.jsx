import NuevaRutinaClient from '@/components/NuevaRutinaClient'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const NuevaRutina = async () => {
  const session = await auth()

  if (session) {
    return (<>
      <NuevaRutinaClient session={session}/>
    </>)
  } else {
    redirect(`/`)
  }
}

export default NuevaRutina
