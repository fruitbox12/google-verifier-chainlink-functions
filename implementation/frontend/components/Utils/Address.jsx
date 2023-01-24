import { Tooltip } from 'antd';

const Address = ({ address }) => {
  //   if (!address) return null;
  const slicedAddress = address
    ? address.slice(0, 6) + '...' + address.slice(-6)
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
