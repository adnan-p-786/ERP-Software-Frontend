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

const data: DataType[] = [
  {
    key: '1',
    name: 'www',
    email: "ndsj"
  },
];

function SalesItems() {
  return (
    <div>
      <Divider>Users Table</Divider>
      <Table<DataType> columns={columns} dataSource={data} size="middle" />
    </div>
  )
}

export default SalesItems