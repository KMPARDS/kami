const ethers = require('ethers');
const util = require('util');
exports.kami1 = {
  config: require('./kami1/kami-config.json'),
  keystore: require('./kami1/keystore.json'),
};
exports.kami2 = {
  config: require('./kami2/kami-config.json'),
  keystore: require('./kami2/keystore.json'),
};
exports.kami3 = {
  config: require('./kami3/kami-config.json'),
  keystore: require('./kami3/keystore.json'),
};
exports.getProvider = (url) => new ethers.providers.JsonRpcProvider(url);
exports.consoleLog = (...input) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n╭' + '-'.repeat(process.stdout.columns - 2 || 30) + '╮');
    console.log('  DEBUG\n');
    console.log(util.inspect([...input], false, null, true));
    console.log('\n╰' + '-'.repeat(process.stdout.columns - 2 || 30) + '╯\n');
  }
};
