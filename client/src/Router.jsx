import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Register from './components/pages/Signup'
import Login from './components/pages/Login'
import PrivateRoute from './helper/auth/PrivateRoute'
import Home from './components/pages/Home'
import AddTask from './components/pages/AddTask'
import ListTask from './components/pages/ListTask'


export default function Router() {


  return (
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route element={<PrivateRoute/>} >
              <Route path='/task/add' element={<AddTask />} />
              <Route path='/task/list' element={<ListTask />} />
            </Route>
        </Route>

      <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  )
}