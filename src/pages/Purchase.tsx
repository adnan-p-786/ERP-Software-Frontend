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
import { PlusOutlined } from '@ant-design/icons';
import { getVariant } from '../apis/variant/variantApi';

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
  const { data, isLoading, error, refetch } = useQuery("getPurchase", getPurchase);
  const { data: vendorsdata } = useQuery("getVendors", getVendors);
  const { data: productdata } = useQuery("getProduct", getProduct);
  const { data: unitdata } = useQuery("getUnits", getUnits);
  const { data: storesdata } = useQuery("getStores", getstores);
  const { data: variantdata } = useQuery("getVariant", getVariant);
  const { data: warehousedata } = useQuery("getWarehouse", getWarehouse);
  const [addModal, setAddModal] = useState(false);
  const { mutate: Create } = useCreatePurchase();

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
      <Divider>Purchase</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        style={{ height: '350px', overflowY: 'auto' }} 
        pagination={false} 
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
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <div className='grid grid-flow-row grid-cols-4 gap-2'>
            <Form.Item name={'billNo'} label="Bill No" rules={[{ required: true, message: "please enter Bill No" }]}>
              <Input placeholder='billNo' />
            </Form.Item>
            <Form.Item
              name={'vendorId'}
              label="Vendors ID"
              rules={[{ required: true, message: "Please select a vendor" }]}
            >
              <Select
                placeholder="Select a Vendor"
                options={vendorsdata?.data?.map((vendor: { _id: string; name: string }) => ({
                  value: vendor._id,
                  label: vendor.name
                }))}
              />
            </Form.Item>
            <Form.Item
              name={'storeId'}
              label="Stores ID"
              rules={[{ required: true, message: "Please select a store" }]}
            >
              <Select
                placeholder="Select a Stores"
                options={storesdata?.data?.map((store: { _id: string; name: string }) => ({
                  value: store._id,
                  label: store.name
                }))}
              />
            </Form.Item>
            <Form.Item
              name={'warehouseId'}
              label="Warehouse ID"
              rules={[{ required: true, message: "Please select a Warehouse" }]}
            >
              <Select
                placeholder="Select a Warehouse"
                options={warehousedata?.data?.map((warehouse: { _id: string; name: string }) => ({
                  value: warehouse._id,
                  label: warehouse.name
                }))}
              />
            </Form.Item>
            <Form.Item name={'totalAmount'} label="Total Amount" rules={[{ required: true, message: "Please enter total amount" }]}>
              <Input placeholder='totalAmount' />
            </Form.Item>
          </div>
          <Divider orientation="left">Purchase Items</Divider>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Form.List
              name="purchaseItems"
              rules={[
                {
                  validator: async (_, items) => {
                    if (!items || items.length < 1) {
                      return Promise.reject(new Error('Please add at least 1 item.'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="grid grid-cols-12 gap-4 items-end">
                      <Form.Item
                        {...field}
                        className="col-span-4"
                        name={[field.name, 'productId']}
                        rules={[{ required: true, message: 'Please select a product' }]}
                      >
                        <Select
                          placeholder="Select Product"
                          options={productdata?.data?.map((product: { _id: string; name: string }) => ({
                            value: product._id,
                            label: product.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        className="col-span-4"
                        name={[field.name, 'unitId']}
                        rules={[{ required: true, message: 'Please select a unit' }]}
                      >
                        <Select
                          placeholder="Select Unit"
                          options={unitdata?.data?.map((unit: { _id: string; name: string }) => ({
                            value: unit._id,
                            label: unit.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        className="col-span-3"
                        name={[field.name, 'quantity']}
                        rules={[{ required: true, message: 'Please enter quantity' }]}
                      >
                        <Input placeholder="Quantity" type="number" />
                      </Form.Item>

                      <Form.Item
                        className="col-span-3"
                        name={[field.name, 'purchasePrice']}
                        rules={[{ required: true, message: 'Please enter purchase price' }]}
                      >
                        <Input placeholder="Purchase Price" type="number" />
                      </Form.Item>

                      <Form.Item
                        className="col-span-3"
                        name={[field.name, 'sellingPrice']}
                        rules={[{ required: true, message: 'Please enter selling price' }]}
                      >
                        <Input placeholder="Selling Price" type="number" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        className="col-span-4"
                        name={[field.name, 'variantId']}
                        rules={[{ required: true, message: 'Please select variant' }]}
                      >
                        <Select
                          placeholder="Select Variant"
                          options={variantdata?.data?.map((variant: { _id: string; }) => ({
                            value: variant._id,
                            // label: variant.name,
                          }))}
                        />
                      </Form.Item>

                      <Button
                        type="text"
                        danger
                        onClick={() => remove(field.name)}
                        className="col-span-1"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Item
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item className="mt-6">
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Purchase;
