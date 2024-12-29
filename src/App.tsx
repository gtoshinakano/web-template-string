
import './App.css'
import { MainStage } from './MainStage'
import { NavMenu } from './NavMenu'

function App() {
  return (
    <main className="flex flex-col w-screen max-h-screen">
      <NavMenu />
      <MainStage />
    </main>)
  
}

export default App
