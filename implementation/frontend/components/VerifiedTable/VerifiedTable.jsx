import { useEffect } from 'react';
import stores from '../../stores';

// For the columns, there will be the timestamp, address, username and success
// of the verification. The table will be sorted by timestamp, with the most
// recent at the top.

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
    </div>
  );
};

export default VerifiedTable;
