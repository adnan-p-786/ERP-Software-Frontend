import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getPurchase } from '../apis/purchase/purchaseApi';
import { useCreatePurchase } from '../apis/purchase/purchaseHooks';
import { getVendors } from '../apis/vendorss/vendorApi';
import { getstores } from '../apis/storess/storesApi';
import { getWarehouse } from '../apis/warehouse/warehouseApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "billNo",
    dataIndex: 'billNo',
  },
  {
    title: 'Vendor ID',
    dataIndex: 'vendorId',
    render: (vendor: any) => vendor?._id || 'N/A',
  },
  {
    title: 'Store ID',
    dataIndex: 'storeId',
    render: (store: any) => store?._id || 'N/A',
  },
  {
    title: 'Warehouse ID',
    dataIndex: 'warehouseId',
    render: (warehouse: any) => warehouse?._id || 'N/A',
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
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



function Purchase() {
  const { data, isLoading, error, refetch } = useQuery("getPurchase",getPurchase)
  const {data:vendorsdata , isLoading:vendorsloading} = useQuery("getVendors",getVendors)
  const {data:storesdata , isLoading:storesloading} = useQuery("getStores",getstores)
  const {data:warehousedata , isLoading:warehouseloading} = useQuery("getWarehouse",getWarehouse)
  const [addModal, setAddModal] = useState(false)
  const { mutate: Create } = useCreatePurchase()

  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }


  const onFinish = (value: any) => {
    Create(value, {
      onSuccess() {
        message.success("added successfully")
        refetch()
        setAddModal(false)
        form.resetFields()
      },
      onError() {
        message.error("faild")
      }
    })
  }


  return (
    <div>
      <Divider>Purchase</Divider>
       <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

<Modal
        title="Add purchase"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'billNo'} label="Bill No" rules={[{ required: true, message: "please enter Name" }]}>
            <Input placeholder='billNo' />
          </Form.Item>
          <Form.Item
            name={'vendorId'}
            label="Vendors ID"
            rules={[{ required: true, message: "Please select a vendor" }]}
          >
            <Select
              placeholder="Select a Vendor"
              options={
                !vendorsloading && vendorsdata?.data.map((subcat: { _id: string; name: string }) => ({
                  value: subcat._id,
                  label: subcat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'storeId'}
            label="Stores ID"
            rules={[{ required: true, message: "Please select a store" }]}
          >
            <Select
              placeholder="Select a Stores"
              options={
                !storesloading && storesdata?.data.map((subcat: { _id: string; name: string }) => ({
                  value: subcat._id,
                  label: subcat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'warehouseId'}
            label="warehouse ID"
            rules={[{ required: true, message: "Please select a Warehouse" }]}
          >
            <Select
              placeholder="Select a Warehouse"
              options={
                !warehouseloading && warehousedata?.data.map((subcat: { _id: string; name: string }) => ({
                  value: subcat._id,
                  label: subcat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'totalAmount'} label="Total Amount" rules={[{ required: true, message: "please enter VAT" }]}>
            <Input placeholder='totalAmount' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Purchase