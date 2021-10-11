import web3 from '../web3';
import newStandardToken from './build/StandardToken.json';


const instance2 = new web3.eth.Contract(
 JSON.parse(newStandardToken.interface), '0x859A1C376777d2BaB8925c9e86BCFdFCF5D057bF'

);
console.log(instance2.toString());

export default instance2;


