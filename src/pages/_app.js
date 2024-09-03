import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'
import { appWithTranslation } from 'next-i18next'
import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Component {...pageProps} />
    </StateContext>
  )
}

export default appWithTranslation(MyApp)
