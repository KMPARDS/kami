const ethers = require('ethers');
exports.kami1 = require('./kami1/kami-config.json');
exports.kami2 = require('./kami2/kami-config.json');
exports.getProvider = (url) => new ethers.providers.JsonRpcProvider(url);
