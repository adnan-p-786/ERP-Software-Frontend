import React from 'react';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  billNo: Number;
  vendorId: string;
  storeId: string;
  warehouseId: string;
  TotalAmount: Number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "billNo",
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  }
];



function Purchase() {
  return (
    <div>
      <Divider>Purchase</Divider>
      <Table 
      columns={columns} 
      // dataSource={data} 
      size="middle" />
    </div>
  )
}

export default Purchase