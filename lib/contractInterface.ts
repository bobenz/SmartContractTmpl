import { ethers } from 'ethers';
import * as HelloWorldArtifact from '../artifacts/contracts/HelloWorld.sol/HelloWorld.json';

const getProvider = (networkUrl: string) => {
  return new ethers.providers.JsonRpcProvider(networkUrl);
};

const getContract = (contractAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  return new ethers.Contract(
    contractAddress,
    HelloWorldArtifact.abi,
    provider
  );
};

export const connectToContract = async (networkName: string, contractAddress: string) => {
  let networkUrl: string;

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

export const setGreeting = async (contract: ethers.Contract, newGreeting: string, signer: ethers.Signer) => {
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.setGreeting(newGreeting);
    await tx.wait();
    return tx;
};

export const getGreeting = async (contract: ethers.Contract) => {
    return contract.getGreeting();
};
