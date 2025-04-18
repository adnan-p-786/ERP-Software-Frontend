import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Table, Upload } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from 'react-query';
import { CiEdit } from 'react-icons/ci';
import { MdCloudUpload, MdDeleteOutline } from 'react-icons/md';
import { getBrand } from '../apis/brand/brandApi';
import { useCreateBrand } from '../apis/brand/brandHooks';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
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


function Brand() {
  const { data, isLoading, error, refetch } = useQuery("getBrand", getBrand)
  const [addModal, setAddModal] = useState(false)
  const { mutate: CreateBrands } = useCreateBrand()
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm()
  if (error) {
    return message.error("data fetching error")
  }


  const onFinish = (values: any) => { 
    console.log(values);
    
    setLoading(true);
    const formdata = new FormData();
    console.log({ values });
    if (values.logo?.file) {
      formdata.append("logo", values.logo.file.originFileObj);
    }
    formdata.append("name", values.name)
  
    CreateBrands(formdata, {
      onSuccess() {
        message.success("brand successfully created");
        setLoading(false);
        setAddModal(false);
        form.resetFields();
        refetch();
      },
      onError(error: any) {  
        setLoading(false);
        if (
          error.response &&
          error.response?.data &&
          error.response?.data?.error
        ) {
          message.error(error.response.data.error);
        }
      },
    });
  };
  


  return (
    <div>
      <Divider>Brand</Divider>
      <div className="w-full flex justify-end">
        <Button type='primary' onClick={() => setAddModal(true)}>Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        size="middle" />

<Modal
        title="Add Brand"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter Brand name" }]}>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item
            name={'logo'}
            label="logo"
            rules={[{ required: true, message: "Please upload logo" }]}
          >
            <Upload multiple={false}>
              <Button><MdCloudUpload />Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='w-full' loading={loading}>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Brand

