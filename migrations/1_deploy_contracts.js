// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
// const BasicMath = artifacts.require("BasicMath")
const MyAuction = artifacts.require("MyAuction");
const product = require("./Product.json");
module.exports = function (deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(MyAuction, product.brand, product.serial, product.period);
};
