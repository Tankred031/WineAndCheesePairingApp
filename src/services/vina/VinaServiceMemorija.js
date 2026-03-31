import { vina } from "./VinaPopis";


async function get() {
    return {success: true, data: [...vina]}
}

async function getById(id) {
    return {success: true, data: vina.find(s => s.id === parseInt(id))}    
}

async function dodaj(vino) {
    if(vina.length === 0) {
        vino.id = 1
    }else{
        vino.id = vina[vina.length -1 ].id + 1
    }
    vina.push(vino)
}

async function promjeni(id, vino) {
    const index = nadiIndex(id)
    vina[index] = {...vina[index], ...vino}    
}

function nadiIndex(id){
    return vina.findIndex(s => s.id === parseInt(id))
}

async function obrisi(id) {
    const index = nadiIndex(id)
    if (index > -1) {
    vina.splice(index, 1) 
    }
    return;      
}

export default{
    get, 
    dodaj,
    getById,
    promjeni,
    obrisi
}