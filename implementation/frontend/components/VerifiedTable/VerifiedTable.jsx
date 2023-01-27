import { Divider, Table, Tooltip } from 'antd';
import { useEffect } from 'react';
import {
  Address,
  ElapsedTime,
  RoundedCurrency,
  TwitterUsername,
} from '../Utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useCMK, useSearch } from '../../hooks';
import stores from '../../stores';

const VerifiedTable = () => {
  const {
    data: graphData,
    loaded,
    setData: setGraphData,
  } = stores.useGraphData();
  const { data: spreadsheetData, setData: setSpreadsheetData } =
    stores.useSpreadsheetData();
  const { replaceError } = stores.useVerification();
  const { getColumnSearchProps } = useSearch();
  const { priceInDollar } = useCMK('LINK');

  const columns = [
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'date',
      render: (timestamp) => <ElapsedTime timestamp={timestamp} />,
      sorter: (a, b) => a.timestamp - b.timestamp,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ethereum address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      render: (address, record) => {
        // Get the address from the spreadsheet if was not included in the request return
        // e.g. if error
        if (
          !address &&
          spreadsheetData &&
          spreadsheetData[record.requestId]?.address
        )
          address = spreadsheetData[record.requestId].address;

        if (address) return <Address address={address} />;
        return <Divider style={{ margin: 0 }} />;
      },
    },
    {
      title: 'Twitter username',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
      render: (username, record) => {
        // Same for username
        if (
          !username &&
          spreadsheetData &&
          spreadsheetData[record.requestId]?.username
        )
          username = spreadsheetData[record.requestId].username;

        if (username) return <TwitterUsername username={username} />;
        return <Divider style={{ margin: 0 }} />;
      },
    },
    {
      title: 'Verification',
      dataIndex: 'result',
      key: 'result',
      render: (result, record) => {
        if (Number(result) === -1) {
          return (
            <span
              className='status error'
              style={{ display: 'flex', alignContent: 'center', gap: '0.5rem' }}
            >
              Error
              {spreadsheetData && spreadsheetData[record.requestId] && (
                <Tooltip
                  title={
                    replaceError[spreadsheetData[record.requestId].errorMsg] ||
                    spreadsheetData[record.requestId].errorMsg ||
                    'Unknown error'
                  }
                >
                  <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                </Tooltip>
              )}
            </span>
          );
        } else if (Number(result) === 0) {
          return <span className='status failed'>Failed</span>;
        } else if (Number(result) === 1) {
          return <span className='status success'>Success</span>;
        }
      },
      filters: [
        { text: 'Error', value: -1 },
        { text: 'Failed', value: 0 },
        { text: 'Success', value: 1 },
      ],
      onFilter: (value, record) => Number(record.result) === value,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (_, record) => {
        if (!spreadsheetData || !spreadsheetData[record.requestId])
          return <Divider style={{ margin: 0 }} />;
        return (
          <span>
            <RoundedCurrency
              value={spreadsheetData[record.requestId]?.totalCost}
              currency='LINK'
            />{' '}
            {priceInDollar && (
              <span style={{ fontSize: '1rem' }}>
                <Divider type='vertical' />
                <span style={{ color: 'var(--color-blue)' }}>
                  <RoundedCurrency
                    value={
                      Number(spreadsheetData[record.requestId]?.totalCost) *
                      Number(priceInDollar)
                    }
                    currency='$'
                  />
                </span>
              </span>
            )}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    setGraphData();
    setSpreadsheetData();
  }, []);

  if (!loaded || !graphData) {
    return 'loading';
  }

  return (
    <div className='verified-table'>
      <span>
        For testing purpose, you can verify an account multiple times, which
        will create multiple entries in the table.
      </span>
      <Table
        columns={columns}
        dataSource={graphData.map((entry) => entry.data)}
        rowKey={(entry) => entry.requestId}
      />
    </div>
  );
};

export default VerifiedTable;
