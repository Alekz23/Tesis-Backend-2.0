const { verificarCedula } = require('udv-ec');
//bdd mern_voteRelations
const keccak256 = require('keccak256')
const cedula = '1004147003';

console.log(verificarCedula(cedula));

let test = Number(keccak256(0))

console.log(test);

// if(test === keccak256(0).toString('hex')){
//     console.log('si');
// }else{
//     console.log('no');
// }