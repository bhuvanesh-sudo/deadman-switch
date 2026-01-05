import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeadMansSwitchModule = buildModule("DeadMansSwitchModule", (m) => {
  // 1. Define the beneficiary (Who gets the money?)
  // We use the second account provided by Hardhat as the beneficiary
  const beneficiary = m.getAccount(1);

  // 2. Deploy the contract
  const deadSwitch = m.contract("DeadMansSwitch", [beneficiary]);

  return { deadSwitch };
});

export default DeadMansSwitchModule;