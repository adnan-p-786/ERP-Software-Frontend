import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import Users from './pages/Users.tsx'
import Roles from './pages/Roles.tsx'
import Privileges from './pages/Privileges.tsx'
import Departments from './pages/Departments.tsx'
import Products from './pages/Products.tsx'
import Racks from './pages/Racks.tsx'
import Stock from './pages/Stock.tsx'
import Categories from './pages/Categories.tsx'
import SubCategories from './pages/SubCategories.tsx'
import Brand from './pages/Brand.tsx'
import Units from './pages/Units.tsx'
import Variants from './pages/Variants.tsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/Dashboard',
        element: <Dashboard/>
      },
      {
        path:'/Users',
        element: <Users/>
      },
      {
        path:'/Roles',
        element: <Roles/>
      },
      {
        path:'/Privileges',
        element: <Privileges/>
      },
      {
        path:'/Departments',
        element: <Departments/>
      },
      {
        path:'/Products',
        element: <Products/>
      },
      {
        path:'/Racks',
        element: <Racks/>
      },
      {
        path:'/Stock',
        element: <Stock/>
      },
      {
        path:'/Categories',
        element: <Categories/>
      },
      {
        path:'/SubCategories',
        element: <SubCategories/>
      },
      {
        path:'/Brand',
        element: <Brand/>
      },
      {
        path:'/Units',
        element: <Units/>
      },
      {
        path:'/Variants',
        element: <Variants/>
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

