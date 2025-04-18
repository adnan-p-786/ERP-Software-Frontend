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
import Purchase from './pages/Purchase.tsx'
import PurchaseItems from './pages/PurchaseItems.tsx'
import Accounts from './pages/Accounts.tsx'
import SalesItems from './pages/SalesItems.tsx'
import Sales from './pages/Sales.tsx'
import Discounts from './pages/Discounts.tsx'
import Expense from './pages/Expense.tsx'
import ExpenseType from './pages/ExpenseType.tsx'
import Customer from './pages/Customer.tsx'
import CustomerAccount from './pages/CustomerAccount.tsx'
import Vendor from './pages/Vendor.tsx'
import VendorAccount from './pages/VendorAccount.tsx'
import Stores from './pages/Stores.tsx'
import Warehouse from './pages/Warehouse.tsx'
import Location from './pages/Location.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'



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
        path:'/Purchase',
        element: <Purchase/>
      },
      {
        path:'/PurchaseItems',
        element: <PurchaseItems/>
      },
      {
        path:'/Accounts',
        element: <Accounts/>
      },
      {
        path:'/Sales',
        element: <Sales/>
      },
      {
        path:'/SalesItems',
        element: <SalesItems/>
      },
      {
        path:'/Discounts',
        element: <Discounts/>
      },
      {
        path:'/Expense',
        element: <Expense/>
      },
      {
        path:'/ExpenseType',
        element: <ExpenseType/>
      },
      {
        path:'/Customer',
        element: <Customer/>
      },
      {
        path:'/CustomerAccount',
        element: <CustomerAccount/>
      },
      {
        path:'/Vendor',
        element: <Vendor/>
      },
      {
        path:'/VendorAccount',
        element: <VendorAccount/>
      },
      {
        path:'/Stores',
        element: <Stores/>
      },
      {
        path:'/Warehouse',
        element: <Warehouse/>
      },
      {
        path:'/Location',
        element: <Location/>
      },
    ]
  }
])

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

