import web3 from '../web3';
import newICO from './build/Hearties.json';


const instance = new web3.eth.Contract(
 JSON.parse(newICO.interface), '0x859A1C376777d2BaB8925c9e86BCFdFCF5D057bF'

);
console.log(instance.toString());

export default instance;


