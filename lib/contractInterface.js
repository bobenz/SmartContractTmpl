const ethers = require('ethers');
const HelloWorldArtifact = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

const getProvider = (networkUrl) => {
  return new ethers.providers.JsonRpcProvider(networkUrl);
};

const getContract = (contractAddress, provider) => {
  return new ethers.Contract(
    contractAddress,
    HelloWorldArtifact.abi,
    provider
  );
};

const connectToContract = async (networkName, contractAddress) => {
  let networkUrl;

  if (networkName === 'testNetwork') {
    networkUrl = process.env.TEST_NETWORK_URL || '';
  } else if (networkName === 'deployNetwork') {
    networkUrl = process.env.DEPLOY_NETWORK_URL || '';
  } else {
    throw new Error(`Unsupported network: ${networkName}`);
  }

  if (!networkUrl) {
    throw new Error(`Network URL not found for ${networkName}`);
  }

  const provider = getProvider(networkUrl);
  const contract = getContract(contractAddress, provider);

  return contract;
};

const setGreeting = async (contract, newGreeting, signer) => {
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.setGreeting(newGreeting);
    await tx.wait();
    return tx;
};

const getGreeting = async (contract) => {
    return contract.getGreeting();
};

module.exports = {
    connectToContract,
    setGreeting,
    getGreeting,
};
