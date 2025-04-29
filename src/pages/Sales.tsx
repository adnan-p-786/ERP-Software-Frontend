import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useCreateSales } from '../apis/sales/salesHooks';
import { getSales } from '../apis/sales/salesApi';
import { getstores } from '../apis/storess/storesApi';

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
  const { data, isLoading, error, refetch } = useQuery("getSales", getSales);
  const { data:storedata, isLoading:storeLoading } = useQuery("getStore", getstores);
  const [addModal, setAddModal] = useState(false);
  const { mutate: Create } = useCreateSales();

  const [form] = Form.useForm();

  if (error) {
    return message.error("data fetching error");
  }

  const onFinish = (value: any) => {
    Create(value, {
      onSuccess() {
        message.success("added successfully");
        refetch();
        setAddModal(false);
        form.resetFields();
      },
      onError() {
        message.error("failed");
      }
    });
  };



  return (
    <div>
      <Divider>Sales</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
       columns={columns}
       dataSource={data?.data}
       loading={isLoading} 
       size="middle" />

<Modal
        title="Add Vendor Accounts"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
        <Form.Item
            name={'storeId'}
            label="store"
            rules={[{ required: true, message: "Please select a storeid" }]}
          >
            <Select
              placeholder="Select a Store id"
              options={
                !storeLoading && storedata?.data.map((store: { _id: string; name: string }) => ({
                  value: store._id,
                  label: store.name
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'type'} label="Type" rules={[{ required: true, message: "please enter Type" }]}>
            <Input placeholder='type' />
          </Form.Item>
          <Form.Item name={'debit'} label="Debit" rules={[{ required: true, message: "please enter Debit" }]}>
            <Input placeholder='debit' />
          </Form.Item>
          <Form.Item name={'credit'} label="Credit" rules={[{ required: true, message: "please enter Credit" }]}>
            <Input placeholder='credit' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Sales