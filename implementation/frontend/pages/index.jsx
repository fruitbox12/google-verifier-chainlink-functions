import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Button, Tooltip } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerifiedTable from '../components/VerifiedTable';
import VerificationModal from '../components/VerificationModal';
import stores from '../stores';

const Home = () => {
  const { isConnected } = useAccount();
  const { setIsModalOpen } = stores.useVerification();
  const [isReallyConnected, setIsReallyConnected] = useState(false);

  // We need to use such a trick because the isConnected hook from wagmi is broken
  // It tells different values to the frontend and the server
  useEffect(() => {
    if (isConnected) {
      setIsReallyConnected(true);
    }
  }, [isConnected]);

  return (
    <div className='container'>
      <Header />
      <main>
        <div className='header'>
          <h1 className='title'>Last verification requests</h1>
          <Tooltip
            title={
              isReallyConnected
                ? ''
                : 'You need to connect your wallet to verify your account'
            }
            placement='bottom'
          >
            <Button
              type='primary'
              disabled={!isReallyConnected}
              onClick={() => setIsModalOpen(true)}
            >
              Verify your account
            </Button>
          </Tooltip>
        </div>

        <VerifiedTable />
        <VerificationModal />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
