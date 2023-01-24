import { Table } from 'antd';
import { useEffect } from 'react';
import { Address, ElapsedTime, TwitterUsername } from '../Utils';
import stores from '../../stores';

const columns = [
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'date',
    render: (timestamp) => <ElapsedTime timestamp={timestamp} />,
  },
  {
    title: 'Ethereum address',
    dataIndex: 'address',
    key: 'address',
    render: (address) => <Address address={address} />,
  },
  {
    title: 'Twitter username',
    dataIndex: 'username',
    key: 'username',
    render: (username) => <TwitterUsername username={username} />,
  },
  {
    title: 'Verification',
    dataIndex: 'result',
    key: 'result',
    render: (result) => {
      if (Number(result) === -1) {
        return <span className='status error'>Error</span>;
      } else if (Number(result) === 0) {
        return <span className='status failed'>Failed</span>;
      } else if (Number(result) === 1) {
        return <span className='status success'>Success</span>;
      }
    },
  },
];

const VerifiedTable = () => {
  const { data, loaded, setData } = stores.useData();

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (!loaded || !data) {
    return 'loading';
  }

  return (
    <div className='verified-table'>
      <span>
        For testing purpose, you can verify an account multiple times, which
        will however not create multiple entries in the table.
      </span>
      <Table
        columns={columns}
        dataSource={data.map((entry) => entry.data)}
        rowKey={(entry) => entry.timestamp}
      />
    </div>
  );
};

export default VerifiedTable;
