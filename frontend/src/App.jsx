import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'

function App() {
  return (
    <>
      <div>

        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <p>testing pull request </p>

    </>
  )
}

export default App
