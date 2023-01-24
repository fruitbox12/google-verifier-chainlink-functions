import { useEffect } from 'react';
import stores from '../../stores';

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

  return null;
};

export default VerifiedTable;
