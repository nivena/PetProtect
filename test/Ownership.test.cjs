const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ownership Contract", function () {
  let Ownership, ownership, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Ownership = await ethers.getContractFactory("Ownership");
    ownership = await Ownership.deploy();
    await ownership.waitForDeployment();
  });

  it("Should allow adding shares", async function () {
    await ownership.addShare(1, addr1.address, 50);
    const shares = await ownership.getShares(1);

    expect(shares.length).to.equal(1);
    expect(shares[0].owner).to.equal(addr1.address);
    expect(shares[0].percentage).to.equal(50);
  });

  it("Should not allow shares over 100%", async function () {
    await expect(ownership.addShare(1, addr1.address, 150)).to.be.revertedWith(
      "Invalid percentage"
    );
  });

  it("Should allow multiple owners", async function () {
    await ownership.addShare(1, addr1.address, 30);
    await ownership.addShare(1, addr2.address, 70);

    const shares = await ownership.getShares(1);
    expect(shares.length).to.equal(2);
    expect(shares[1].owner).to.equal(addr2.address);
    expect(shares[1].percentage).to.equal(70);
  });
});
