import '@/assets/styles/index.css'
import { fontFamily, fontFamilyHeadings } from './fonts'

export const metadata = {
  title: 'AuraTEA',
  description: 'Aplicación integral para familias con niños con autismo. Descubre rutinas personalizadas y recursos prácticos para apoyar el desarrollo y bienestar de tu hijo. ¡Mejora la vida familiar con herramientas diseñadas para ti!',
}

export default async function RootLayout({ children }) {
  return (
      <html lang="es">
      <body className={`${fontFamily.variable} ${fontFamilyHeadings.variable}`}>
      <div className={'content'}>
        {children}
      </div>
      </body>
      </html>
  )
}
