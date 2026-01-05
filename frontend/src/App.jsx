import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/admin/Dashboard'
import Analytics from './pages/admin/Analytics'
import Products from './pages/admin/Products'
import Orders from './pages/admin/Orders'
import Settings from './pages/admin/Settings'
import Payment from './pages/admin/Payment'
import Enquiry from './pages/admin/Enquiry'
import Marketing from './pages/admin/Marketing'
import User from './pages/admin/User'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <div>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/analytics' element={<Analytics />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/admin/setting' element={<Settings />} />
          <Route path='/admin/payment' element={<Payment />} />
          <Route path='/admin/enquiry' element={<Enquiry />} />
          <Route path='/admin/marketing' element={<Marketing />} />
          <Route path='/admin/user' element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>


    </>
  )
}

export default App
