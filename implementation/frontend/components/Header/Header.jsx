import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header>
      <div className='title'>Twitter Verifier</div>
      <ConnectButton showBalance={false} chainStatus='none' />
    </header>
  );
};

export default Header;
