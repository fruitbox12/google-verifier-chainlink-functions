import { Tooltip } from 'antd';
import { useWidth } from '../../hooks';

const Address = ({ address }) => {
  const width = useWidth();

  const slicedAddress = address
    ? width > 900
      ? address
      : address.slice(0, 6) + '...' + address.slice(-6)
    : null;

  return (
    <Tooltip title={address}>
      <a
        href={`https://mumbai.polygonscan.com/address/${address}`}
        target='_blank'
        rel='noreferrer'
      >
        {slicedAddress}
      </a>
    </Tooltip>
  );
};

export default Address;
