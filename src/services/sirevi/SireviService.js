import { sirevi } from "./SireviPopis";


async function get() {
    return { data: sirevi }
}

async function dodaj(sir) {
    if(sirevi.length > 0) {
        sir.id = sirevi[sirevi.length -1].id +1
    }else{
        sir.id = 1
    }
    sirevi.push(sir)
}


export default {
    get, 
    dodaj
}