const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld", function () {
  it("Should return the new greeting once it's changed", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy("Hello, world!");
    await helloWorld.deployed();

    expect(await helloWorld.getGreeting()).to.equal("Hello, world!");

    const setGreetingTx = await helloWorld.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await helloWorld.getGreeting()).to.equal("Hola, mundo!");
  });
});
