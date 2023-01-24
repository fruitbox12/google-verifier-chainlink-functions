import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header>
      <div className='title'>Twitter Verifier</div>
      <ConnectButton showBalance={false} />
    </header>
  );
};

export default Header;
