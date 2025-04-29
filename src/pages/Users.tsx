import React from 'react';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  }
];



const Users: React.FC = () => {
  return (
    <div>
      <Divider>Users</Divider>
      <Table 
      columns={columns} 
      // dataSource={data} 
      size="middle" />
    </div>
  );
};

export default Users;
