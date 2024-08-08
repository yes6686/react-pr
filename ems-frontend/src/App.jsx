import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            <Route path='/' element={<ListEmployeeComponent/>}></Route>
            <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
            <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
            <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
