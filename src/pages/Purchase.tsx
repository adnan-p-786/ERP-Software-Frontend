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
import { getProduct } from '../apis/products/productApi';
import { getUnits } from '../apis/units/unitsApi';

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
    title: 'Purchase ID',
    dataIndex: 'purchaseId',
    render: (purchase: any) => purchase?._id || 'N/A',
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
  const { data, isLoading, error, refetch } = useQuery("getPurchase", getPurchase)
  const { data: vendorsdata, isLoading: vendorsloading } = useQuery("getVendors", getVendors)
  const { data: productdata, isLoading: productloading } = useQuery("getProduct", getProduct)
  const { data: unitdata, isLoading: unitloading } = useQuery("getUnits", getUnits)
  const { data: storesdata, isLoading: storesloading } = useQuery("getStores", getstores)
  const { data: warehousedata, isLoading: warehouseloading } = useQuery("getWarehouse", getWarehouse)
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
        title="Add Purchase"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        width={1200}
      >
        <Form layout='vertical' onFinish={onFinish} form={form} className='
         grid grid-flow-row grid-cols-4 gap-2'>
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
          <Divider orientation="left">Purchase Items</Divider>
          <Form.Item
            name={'productId'}
            label="product ID"
            rules={[{ required: true, message: "Please select a Product ID" }]}
          >
            <Select
              placeholder="Select a Product"
              options={
                !productloading && productdata?.data.map((product: { _id: string; }) => ({
                  value: product._id
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'unitId'}
            label="Unit ID"
            rules={[{ required: true, message: "Please select a Unit ID" }]}
          >
            <Select
              placeholder="Select a Unit"
              options={
                !unitloading && unitdata?.data.map((Unit: { _id: string; }) => ({
                  value: Unit._id
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'quantity'} label="Quantity" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Quantity' />
          </Form.Item>
          <Form.Item name={'purchasePrice'} label="Purchase Price" rules={[{ required: true, message: "please enter Purchase Price" }]}>
            <Input placeholder='Purchase Price' />
          </Form.Item>
          <Form.Item name={'sellingPrice'} label="Selling Price" rules={[{ required: true, message: "please enter Selling Price" }]}>
            <Input placeholder='Selling Price' />
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