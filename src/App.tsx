import './App.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiPurchaseTag } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
function App() {
  

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout className='h-screen'>
      <Sider className='overflow-y-scroll sidebarHidden' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key={'1'} icon={<MdDashboard />}>
           <Link to= '/Dashboard'> DASHBOARD </Link>
          </Menu.Item>

          <SubMenu key={'2'} title="USERS" icon={<HiOutlineUsers />}>
            <Menu.Item>
             <Link to= '/Users'>Users</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Roles'>Roles</Link>
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Departments'>Departments</Link> 
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'3'} title="PRODUCTS">
            <Menu.Item>
            <Link to= '/Products'>Products</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Stock'>Stock</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Racks'>Racks</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Categories'>Categories</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/SubCategories'>Sub Categories</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Brand'>Brand</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/units'>units</Link>  
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'4'} title="PURCHASE" icon={<BiPurchaseTag />}>
            <Menu.Item>
            <Link to= '/Purchase'>Purchase</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Variant'>Variant</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/PurchaseItems'>Purchase Items</Link>  
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Accounts'>Accounts</Link>  
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'5'} title="SALES">
            <Menu.Item>
            <Link to= '/Sales'>Sales</Link>
            </Menu.Item>
            <Menu.Item>
            <Link to= '/SalesItems'>Sales Items</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Discounts'>Discounts</Link> 
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'6'} title="EXPENSE">
            <Menu.Item>
            <Link to= '/Expense'>Expense</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/ExpenseType'>Expense Type</Link>
            </Menu.Item>
            <Menu.Item>
            <Link to= '/OtherExpenses'>Other Expenses</Link>
            </Menu.Item>
          </SubMenu>

        
          <SubMenu key={'7'} title="CUSTOMER">
            <Menu.Item>
            <Link to= '/Customer'>Customer</Link>  
            </Menu.Item>
            <Menu.Item>
            <Link to= '/CustomerAccount'>Customer Account</Link>   
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'8'} title="VENDOR">
            <Menu.Item>
            <Link to= '/Vendor'>Vendor</Link>  
            </Menu.Item>
            <Menu.Item>
            <Link to= '/VendorAccount'>Vendor Account</Link> 
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'9'} title="LOCATION & INFRASTRUCTURE" icon={<IoLocationOutline />}>
            <Menu.Item>
            <Link to= '/Stores'>Stores</Link>  
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Warehouse'>Warehouse</Link> 
            </Menu.Item>
            <Menu.Item>
            <Link to= '/Location'>Location</Link> 
            </Menu.Item>
          </SubMenu>
          
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default App
