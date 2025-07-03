import Header from './components/Header'
import Toolbar from './components/Tools'
import TitleBar from './components/Third'
import './App.css'
import Footer from './components/Footer'

function App() {
  return (
    <div className="overflow-hidden h-screen flex flex-col max-w-screen">
      <Header />
      <Toolbar/>
      <TitleBar/>
      <Footer/>
    </div>
  )
}

export default App