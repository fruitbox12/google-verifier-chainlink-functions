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

  return (
    <div className='container'>
      <Header />
      <main>
        <div className='header'>
          <h1 className='title'>Last verification requests</h1>
          <Tooltip
            title={
              !isConnected
                ? 'You need to connect your wallet to verify your account'
                : ''
            }
            placement='bottom'
          >
            <Button
              type='primary'
              disabled={!isConnected}
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
