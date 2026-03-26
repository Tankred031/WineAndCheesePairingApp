import { vina } from "./VinaPopis";


async function get() {
    return {data: [...vina]}
}

async function getById(id) {
    return {data: vina.find(s => s.id === parseInt(id))}    
}

async function dodaj(vino) {
    if(vina.length>0) {
        vina.id = vina[vina.length-1].id+1
    }else{
        vina.id = 1
    }
    vina.push(vino)
}

async function promjeni(id, vina) {
    const index = nadiIndex(id)
    vina[index] = {...vina[index], ...vina}    
}

function nadiIndex(id){
    return vina.findIndex(s => s.id === parseInt(id))
}

export default{
    get, 
    dodaj,
    getById,
    promjeni
}