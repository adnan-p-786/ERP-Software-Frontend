import React, { useState } from 'react';
import { Button, Divider, Form, message, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Store ID',
    dataIndex: 'storeId',
    render: (store: any) => store?._id || 'N/A',
  },
  {
    title: 'Warehouse ID',
    dataIndex: 'warehouseId',
    render: (Warehouse: any) => Warehouse?._id || 'N/A',
  },
  {
    title: 'Customer ID',
    dataIndex: 'customerId',
    render: (Customer: any) => Customer?._id || 'N/A',
  },
  {
    title: "Total Amount",
    dataIndex:'total_amount',
  },
  {
    title: "Discounted ID",
    dataIndex:'discountId',
    render: (discount: any) => discount?._id || 'N/A',
  },
  {
    title: "Discounted Amount",
    dataIndex:'discounted_amount',
  },
  {
    title: "User ID",
    dataIndex:'usersId',
    render: (user: any) => user?._id || 'N/A',
  },
  {
    title: "Action",
    render: (record) => (
      <div className="flex gap-2">
        <Button><CiEdit /> Edit</Button>
        <Button><MdDeleteOutline /> Delete</Button>
      </div>
    )
  }
];


function Sales() {
  // const { data, isLoading, error, refetch } = useQuery("getSales", getSales);
  const [addModal, setAddModal] = useState(false);
  // const { mutate: Create } = useCreatePurchase();

  const [form] = Form.useForm();

  // if (error) {
  //   return message.error("data fetching error");
  // }

  // const onFinish = (value: any) => {
  //   // Create(value, {
  //     onSuccess() {
  //       message.success("added successfully");
  //       // refetch();
  //       setAddModal(false);
  //       form.resetFields();
  //     },
  //     onError() {
  //       message.error("failed");
  //     }
  //   });
  // };



  return (
    <div>
      <Divider>Sales</Divider>
      <div className="w-full flex justify-end">
              <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
            </div>
      <Table 
       columns={columns}
      //  dataSource={data} 
       size="middle" />
    </div>
  )
}

export default Sales