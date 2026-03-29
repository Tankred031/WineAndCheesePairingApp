import { sirevi } from "./SireviPopis";


async function get() {
    return {data: [...sirevi]}
}

async function getById(id) {
    return {data: sirevi.find(s => s.id === parseInt(id))}    
}

async function dodaj(sir) {
    if(sirevi.length>0) {
        sirevi.id = sirevi[sirevi.length-1].id+1
    }else{
        sirevi.id = 1
    }
    sirevi.push(sir)
}

async function promjeni(id, sirevi) {
    const index = nadiIndex(id)
    sirevi[index] = {...sirevi[index], ...sirevi}    
}

function nadiIndex(id){
    return sirevi.findIndex(s => s.id === parseInt(id))
}

async function obrisi(id) {
    const index = nadiIndex(id)
    sirevi.splice(index,1)
}

export default{
    get, 
    dodaj, 
    getById,
    promjeni,
    obrisi
}