import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { getDepartment } from '../apis/department/departmentApi';
import { useCreateDepartment, useDeleteDepartment, useUpdateDepartment } from '../apis/department/departmentHooks';

interface DataType {
  key: React.Key;
  name: string;
}


function Departments() {
  const {data,isLoading,error,refetch} = useQuery("getDepartments",getDepartment)
  const [addModal, setAddModal] = useState(false)
  const [currentDepartment, setUpdateDepartment] = useState<any>(null);
  const {mutate:Create} = useCreateDepartment()
  const {mutate:Update} = useUpdateDepartment()
  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }

  const onFinish = (value: any) => {
    Create(value, {
      onSuccess() {
        message.success("add successfully")
        refetch()
        setAddModal(false)
        form.resetFields()
      },
      onError() {
        message.error("faild")
      }
    })
  }

  const onUpdate = (values: any) => {
    Update({ id: currentDepartment._id, data: values }, {
      onSuccess: () => {
        message.success("Category updated successfully");
        refetch();
        setUpdateDepartment(false);
        form.resetFields();
      },
      onError: () => {
        message.error("Update failed");
      }
    });
  };


  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: "Action",
      render : (_,record)=> (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(record)}><CiEdit /> Edit</Button>
          <Button><MdDeleteOutline /> Delete</Button>
        </div>
      )
    }
  ];
  

  const handleEdit = (record: any) => {
    setUpdateDepartment(record);
    form.setFieldsValue({ name: record.name });
    setUpdateDepartment(true);
  };

  return (
    <div>
      <Divider>Departments</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
       columns={columns}
        dataSource={data?.data} 
        loading= {isLoading}
        size="middle" />

<Modal
        title="Add Category"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Category Name" rules={[{ required: true, message: "please enter Department name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full '>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Category"
        open={currentDepartment}
        onCancel={() => setUpdateDepartment(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onUpdate} form={form}>
          <Form.Item name='name' label="Category Name" rules={[{ required: true, message: "Please enter category name" }]}>
            <Input placeholder='Enter category name' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full'>Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Departments