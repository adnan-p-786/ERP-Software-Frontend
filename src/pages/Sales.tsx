import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useCreateSales } from '../apis/sales/salesHooks';
import { getSales } from '../apis/sales/salesApi';
import { getstores } from '../apis/storess/storesApi';
import { getWarehouse } from '../apis/warehouse/warehouseApi';
import { getCustomers } from '../apis/customer/customerApi';
import { getDiscount } from '../apis/discount/discountApi';
import { getUser } from '../apis/users/userApi';
import { getStocks } from '../apis/stock/stockApi';
import { getUnits } from '../apis/units/unitsApi';
import { PlusOutlined } from '@ant-design/icons';

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
    dataIndex: 'total_amount',
  },
  {
    title: "Discounted ID",
    dataIndex: 'discountId',
    render: (discount: any) => discount?._id || 'N/A',
  },
  {
    title: "Discounted Amount",
    dataIndex: 'discounted_amount',
  },
  {
    title: "User ID",
    dataIndex: 'usersId',
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
  const { data: storedata } = useQuery("getStore", getstores);
  const { data: warehousedata } = useQuery("getWarehouse", getWarehouse);
  const { data: customerdata } = useQuery("getcustomers", getCustomers);
  const { data: discountdata } = useQuery("getDiscount", getDiscount);
  const { data: stockdata } = useQuery("getstock", getStocks);
  const { data: unitdata } = useQuery("getunits", getUnits);
  const { data: userdata } = useQuery("getUsers", getUser);
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
        title="Add Sales"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        width={1200}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <div className='grid grid-flow-row grid-cols-4 gap-2'>
            <Form.Item
              name={'storeId'}
              label="Store ID"
              rules={[{ required: true, message: "Please select a Store Id" }]}
            >
              <Select
                placeholder="Select a Stores"
                options={storedata?.data?.map((store: { _id: string;}) => ({
                  value: store._id,
                  // label: store.name
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
                options={warehousedata?.data?.map((warehouse: { _id: string;}) => ({
                  value: warehouse._id,
                  // label: warehouse.name
                }))}
              />
            </Form.Item>
            <Form.Item
              name={'customerId'}
              label="Customer ID"
              rules={[{ required: true, message: "Please select a Customer Id" }]}
            >
              <Select
                placeholder="Select a Customer ID"
                options={customerdata?.data?.map((customer: { _id: string; }) => ({
                  value: customer._id,
                  // label: customer.name
                }))}
              />
            </Form.Item>
            <Form.Item name={'total_amount'} label="Total Amount" rules={[{ required: true, message: "Please enter Total Amount" }]}>
              <Input placeholder='Total Amount' />
            </Form.Item>
            <Form.Item
              name={'discountId'}
              label="Discount ID"
              rules={[{ required: true, message: "Please select a Discount Id" }]}
            >
              <Select
                placeholder="Select a Discount ID"
                options={discountdata?.data?.map((discount: { _id: string;  }) => ({
                  value: discount._id,
                  // label: discount.name
                }))}
              />
            </Form.Item>
            <Form.Item name={'discounted_amount'} label="Discounted Amount" rules={[{ required: true, message: "Please enter Discounted Amount" }]}>
              <Input placeholder='Discounted Amount' />
            </Form.Item>
            <Form.Item
              name={'usersId'}
              label="User ID"
              rules={[{ required: true, message: "Please select a User Id" }]}
            >
              <Select
                placeholder="Select a User ID"
                options={userdata?.data?.map((User: { _id: string;  }) => ({
                  value: User._id,
                  // label: User.name
                }))}
              />
            </Form.Item>
          </div>
          <Divider orientation="left">Sales Items</Divider>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Form.List
              name="SalesItems"
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
                        name={[field.name, 'stockId']}
                        rules={[{ required: true, message: 'Please select a stockId' }]}
                      >
                        <Select
                          placeholder="Select Stock Id"
                          options={stockdata?.data?.map((stock: { _id: string; }) => ({
                            value: stock._id,
                            // label: stock.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        className="col-span-3"
                        name={[field.name, 'quantity']}
                        rules={[{ required: true, message: 'Please enter Quantity' }]}
                      >
                        <Input placeholder="Quantity" type="number" />
                      </Form.Item>

                      <Form.Item
                        className="col-span-4"
                        name={[field.name, 'unitId']}
                        rules={[{ required: true, message: 'Please select a unit' }]}
                      >
                        <Select
                          placeholder="Select Unit Id"
                          options={unitdata?.data?.map((unit: { _id: string; }) => ({
                            value: unit._id,
                            // label: unit.name,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        className="col-span-3"
                        name={[field.name, 'price']}
                        rules={[{ required: true, message: 'Please enter price' }]}
                      >
                        <Input placeholder=" Price" type="number" />
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
  )
}

export default Sales