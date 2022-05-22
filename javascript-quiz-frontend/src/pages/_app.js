// import '../src/styles/styles.scss'
import "../styles/styles.scss"
import BaseComponent from "../components/base-component"
import { ChakraProvider } from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <BaseComponent>
        <Component {...pageProps} />
      </BaseComponent>
    </ChakraProvider>
  )
}

export default MyApp
