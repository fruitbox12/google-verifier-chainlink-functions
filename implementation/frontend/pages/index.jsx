import Header from '../components/Header';
import Footer from '../components/Footer';
import VerifiedTable from '../components/VerifiedTable';
import { useAccount } from 'wagmi';
import { Button, Tooltip } from 'antd';

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <div className='container'>
      <Header />
      <main>
        <div className='header'>
          For testing purpose, you can verify an account multiple times, which
          will however not create multiple entries in the table.
          <h1 className='title'>Verified accounts</h1>
          <Tooltip
            title={
              !isConnected
                ? 'You need to connect your wallet to verify your account'
                : ''
            }
            placement='bottom'
          >
            <Button type='primary' disabled={!isConnected}>
              Verify your account
            </Button>
          </Tooltip>
        </div>

        <VerifiedTable />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
