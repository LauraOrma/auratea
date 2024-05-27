import { Bricolage_Grotesque, Poppins } from 'next/font/google'

export const fontFamily = Poppins({
  subsets: ['latin'],
  variable: '--font-family',
  weight: ['400', '500', '700'],
  preload: true,
})

export const fontFamilyHeadings = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-family-headings',
  weight: ['400', '700'],
  preload: true,
})
