import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'
import { LanguageProvider } from './provider/languageProvider'
import MainProvider from './provider/mainProvider'
import Landing from './screens/Landing/Landing'

function App() {

  return (
    <div className="App">
      <LanguageProvider>
        <Landing>
          <Header />
          <MainProvider>
            <Main />
          </MainProvider>
        </Landing>
      </LanguageProvider>
    </div>
  )
}

export default App
