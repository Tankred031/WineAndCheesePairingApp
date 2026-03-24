import { vina } from "./VinaPopis";


async function get() {
    return { data: vina }
}

async function dodaj(vina) {
    if(vina.length > 0) {
        vina.id = vina[vina.length -1].id +1
    }else{
        vina.id = 1
    }
    vina.push(vina)
}

export default {
    get, 
    dodaj
}