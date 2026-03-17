import { pairingRules } from "./UparivanjePopis";
  
  
async function get() {  
    return pairingRules[wineName] || [];
}


export default {
    get
}