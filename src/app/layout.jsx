// Next Imports
import { headers } from 'next/headers'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Pertamina - Asset Management System',
  description: 'Pertamina - Comprehensive Asset and Inventory Management System'
}

const RootLayout = ({ children }) => {
  // Vars
  const headersList = headers()
  const defaultLang = 'en'
  const direction = i18n.langDirection[defaultLang]

  return (
    <TranslationWrapper headersList={headersList} lang={defaultLang}>
      <html id='__next' lang={defaultLang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
