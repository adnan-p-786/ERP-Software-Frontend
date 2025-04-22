import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getRoles } from '../apis/Roles/rolesApi';
import { useCreateRoles } from '../apis/Roles/rolesHooks';

interface DataType {
  key: React.Key;
  name: string;
  description: string;
  privileges: {
    crud: boolean;
    create: string[];
    update: string[];
    delete: string[];
  };
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Privileges',
    render: (_, record) => (
      <div>
        <div><b>CRUD:</b> {record.privileges?.crud ? 'Yes' : 'No'}</div>
        <div><b>Create:</b> {record.privileges?.create?.join(', ')}</div>
        <div><b>Update:</b> {record.privileges?.update?.join(', ')}</div>
        <div><b>Delete:</b> {record.privileges?.delete?.join(', ')}</div>
      </div>
    ),
  },
  {
    title: "Action",
    render: (record) => (
      <div className="flex gap-2">
        <Button icon={<CiEdit />}>Edit</Button>
        <Button icon={<MdDeleteOutline />}>Delete</Button>
      </div>
    )
  }
];

const privilegeOptions = [
  { value: "Customer Accounts", label: "Customer Accounts" },
  { value: "Vendor Accounts", label: "Vendor Accounts" },
  { value: "Stores", label: "Stores" },
  { value: "Products", label: "Products" },
  { value: "Purchase", label: "Purchase" },
  { value: "Sales", label: "Sales" },
  { value: "Stocks", label: "Stocks" },
  { value: "Racks", label: "Racks" },
  { value: "Categories", label: "Categories" },
  { value: "SubCategories", label: "SubCategories" },
  { value: "Brand", label: "Brand" },
  { value: "Unit", label: "Unit" },
  { value: "Purchase Items", label: "Purchase Items" },
  { value: "Accounts", label: "Accounts" },
  { value: "Sales Items", label: "Sales Items" },
  { value: "Discounts", label: "Discounts" },
  { value: "Expense", label: "Expense" },
  { value: "Expense Type", label: "Expense Type" },
  { value: "Customer", label: "Customer" },
  { value: "Customer Account", label: "Customer Account" },
  { value: "Vendor", label: "Vendor" },
  { value: "Vendor Account", label: "Vendor Account" },
  { value: "Warehouse", label: "Warehouse" },
  { value: "Location", label: "Location" },
];

function Roles() {
  const { data, isLoading, error, refetch } = useQuery("getRoles", getRoles);
  const [addModal, setAddModal] = useState(false);
  const { mutate: Create } = useCreateRoles();
  const [form] = Form.useForm();

  if (error) {
    return message.error("Data fetching error");
  }

  const onFinish = (values: any) => {
    const payload = {
      name: values.name,
      description: values.description,
      privileges: {
        crud: values.crud || false,
        create: values.create || [],
        update: values.update || [],
        delete: values.delete || [],
      },
    };

    Create(payload, {
      onSuccess() {
        message.success("Role added successfully");
        refetch();
        setAddModal(false);
        form.resetFields();
      },
      onError() {
        message.error("Failed to add role");
      }
    });
  };

  return (
    <div>
      <Divider>Roles</Divider>
      <div className="w-full flex justify-end mb-4">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        size="middle"
      />
      <Modal
        title="Add Role"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name="name" label="Role Name" rules={[{ required: true, message: "Please enter a role name" }]}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter a description" }]}>
            <Input placeholder='Description' />
          </Form.Item>
          <Form.Item name="crud" valuePropName="checked">
            <Checkbox>CRUD access</Checkbox>
          </Form.Item>
          <Form.Item name="create" label="Create Privileges">
            <Select mode='multiple' placeholder='Select modules' options={privilegeOptions} />
          </Form.Item>
          <Form.Item name="update" label="Update Privileges">
            <Select mode='multiple' placeholder='Select modules' options={privilegeOptions} />
          </Form.Item>
          <Form.Item name="delete" label="Delete Privileges">
            <Select mode='multiple' placeholder='Select modules' options={privilegeOptions} />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' className='w-full'>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Roles;
