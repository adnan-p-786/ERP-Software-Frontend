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
    title: 'Credit',
    dataIndex: 'credit',
  },
  {
    title: 'Debit',
    dataIndex: 'debit',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Particulars',
    dataIndex: 'particulars',
  },
];


function Accounts() {
  return (
    <div>
      <Divider>Accounts</Divider>
      <Table 
      columns={columns} 
      // dataSource={data} 
      size="middle" />
    </div>
  )
}

export default Accounts