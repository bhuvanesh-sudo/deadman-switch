import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DeadMansSwitch", function () {
  async function deployFixture() {
    const [owner, beneficiary] = await ethers.getSigners();
    const Switch = await ethers.getContractFactory("DeadMansSwitch");
    // Ensure the contract name above matches "DeadMansSwitch" exactly!
    const deadSwitch = await Switch.deploy(beneficiary.address);
    return { deadSwitch, owner, beneficiary };
  }

  it("Should allow owner to ping", async function () {
    const { deadSwitch } = await loadFixture(deployFixture);
    await deadSwitch.ping();
  });

  it("Should allow claim after 52 weeks", async function () {
    const { deadSwitch, beneficiary } = await loadFixture(deployFixture);
    const ONE_YEAR = 52 * 7 * 24 * 60 * 60;
    
    // Time Travel
    await time.increase(ONE_YEAR + 1);
    
    // We use .claim() here, NOT .withdraw()
    await expect(deadSwitch.connect(beneficiary).claim()).not.to.be.reverted;
  });
});