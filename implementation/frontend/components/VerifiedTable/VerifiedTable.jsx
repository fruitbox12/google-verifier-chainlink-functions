import stores from '../../stores';

const VerifiedTable = () => {
  const { data, loaded } = stores.useData();

  if (!loaded || !data) {
    return 'loading';
  }

  return null;
};

export default VerifiedTable;
