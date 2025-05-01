import { Divider, Table, TableColumnsType } from "antd";
import { useQuery } from 'react-query';
import { getAccounts } from '../apis/Accounts/AccountApi';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Credit',
    dataIndex: 'credit',
  },
  {
    title: 'Debit',
    dataIndex: 'debit',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Particulars',
    dataIndex: 'particulars',
  }
];


function Accounts() {
  const { data, isLoading,} = useQuery("getAccounts", getAccounts)
  return (
    <div>
      <Divider>Accounts</Divider>
      <Table 
      columns={columns} 
      dataSource={data?.data} 
      loading={isLoading}
      size="large" />
    </div>
  )
}

export default Accounts