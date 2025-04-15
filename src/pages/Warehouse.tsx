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
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

function Warehouse() {
  return (
    <div>
          <Divider>Warehouse</Divider>
          <Table 
          columns={columns} 
          // dataSource={data} 
          size="middle" />
        </div>
  )
}

export default Warehouse