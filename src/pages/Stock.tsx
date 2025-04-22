import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useCreateStocks } from '../apis/stock/stockHooks';
import { useQuery } from 'react-query';
import { getStocks } from '../apis/stock/stockApi';
import { getProduct } from '../apis/products/productApi';
import { getUnits } from '../apis/units/unitsApi';
import { getstores } from '../apis/storess/storesApi';
import { getWarehouse } from '../apis/warehouse/warehouseApi';
import { getVendors } from '../apis/vendorss/vendorApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Product Id',
    dataIndex: 'productId',
    render: (product: any) => product?._id || 'N/A',
  },
  {
    title: 'Unit Id',
    dataIndex: 'unitId',
    render: (unit: any) => unit?._id || 'N/A',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Purchase Price',
    dataIndex: 'purchase_price',
  },
  {
    title: 'Selling Price',
    dataIndex: 'selling_price',
  },
  {
    title: 'Barcode',
    dataIndex: 'barcode',
  },
  {
    title: 'Store Id',
    dataIndex: 'storeId',
    render: (store: any) => store?._id || 'N/A',
  },
  {
    title: 'Warehouse Id',
    dataIndex: 'warehouseId',
    render: (warehouse: any) => warehouse?._id || 'N/A',
  },
  {
    title: 'Vendor Id',
    dataIndex: 'vendorId',
    render: (vendor: any) => vendor?._id || 'N/A',
  },
  {
    title: 'Bill No',
    dataIndex: 'billNo',
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


function Stock() {
  const { data: productdata, isLoading: productloading } = useQuery('getproduct', getProduct)
  const { data: unitdata, isLoading: unitloading } = useQuery('getUnits', getUnits)
  const { data: storedata, isLoading: storeloading } = useQuery('getStores', getstores)
  const { data: warehousedata, isLoading: warehouseloading } = useQuery('getWarehouse', getWarehouse)
  const { data: vendordata, isLoading: vendorloading } = useQuery('getVendor', getVendors)
  const { data, isLoading, error, refetch } = useQuery("getStocks", getStocks)
  const [addModal, setAddModal] = useState(false)
  const { mutate: Create } = useCreateStocks()

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
      <Divider>Stocks</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="middle" />

<Modal
        title="Add Stocks"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
        <Form.Item
            name={'productId'}
            label="Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select
              placeholder="Select a product"
              options={
                !productloading && productdata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'unitId'}
            label="Unit"
            rules={[{ required: true, message: "Please select a Unit" }]}
          >
            <Select
              placeholder="Select a Unit"
              options={
                !unitloading && unitdata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'quantity'} label="Quantity" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Quantity' />
          </Form.Item>
          <Form.Item name={'purchase_price'} label="Purchase Price" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Purchase Price' />
          </Form.Item>
          <Form.Item name={'selling_price'} label="Selling Price" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Selling Price' />
          </Form.Item>
          <Form.Item name={'barcode'} label="Barcode" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Barcode' />
          </Form.Item>
          <Form.Item
            name={'storeId'}
            label="Store"
            rules={[{ required: true, message: "Please select a Store" }]}
          >
            <Select
              placeholder="Select a Store"
              options={
                !storeloading && storedata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'warehouseId'}
            label="Warehouse"
            rules={[{ required: true, message: "Please select a Warehouse" }]}
          >
            <Select
              placeholder="Select a Warehouse"
              options={
                !warehouseloading && warehousedata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name={'vendorId'}
            label="Vendor"
            rules={[{ required: true, message: "Please select a Vendor" }]}
          >
            <Select
              placeholder="Select a Vendor"
              options={
                !vendorloading && vendordata?.data.map((cat: { _id: string; name: string }) => ({
                  value: cat._id,
                  label: cat.name
                }))
              }
            />
          </Form.Item>
          <Form.Item name={'billNo'} label="Bill No" rules={[{ required: true, message: "please enter Quantity" }]}>
            <Input placeholder='Bill No' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Stock