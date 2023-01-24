import CryptoJS from 'crypto-js';

const key = process.env.NEXT_PUBLIC_AES_ENCRYPTION_KEY;

const useEncryption = () => {
  const encrypt = (username, address) => {
    // Generate a random iv in hex
    const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);

    // Encrypt
    const encryptedData = CryptoJS.AES.encrypt(username + address, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Turn the encrypted data into a hex string
    const encryptedHex = Buffer.from(
      encryptedData.toString(),
      'base64',
    ).toString('hex');

    // Prepend iv to hex encrypted for use in decryption
    return iv + encryptedHex;
  };

  const decrypt = (encrypted) => {
    // Grab the iv and encrypted data from the encrypted proof
    const iv = encrypted.slice(0, 32);
    const encryptedData = encrypted.slice(32);

    // Get back the encrypted hex string in base64
    const encryptedBase64 = Buffer.from(encryptedData, 'hex').toString(
      'base64',
    );

    try {
      const decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // We must transform to lowercase because the addresses can mismatch if not
      return decryptedData.toString(CryptoJS.enc.Utf8).toLowerCase();
    } catch (err) {
      return '';
    }
  };

  const testMatch = (decrypted, expected) => {
    return decrypted.toLowerCase() === expected.toLowerCase();
  };

  return { encrypt, decrypt, testMatch };
};

export default useEncryption;
