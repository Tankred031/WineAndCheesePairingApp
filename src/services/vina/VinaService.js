import { vina } from "./VinaPopis";


async function get() {
    return { data: vina }
}

async function dodaj(vino) {
    if(vina.length > 0) {
        vino.id = vina[vina.length -1].id +1
    }else{
        vino.id = 1
    }
    vina.push(vino)
}

export default {
    get, 
    dodaj
}