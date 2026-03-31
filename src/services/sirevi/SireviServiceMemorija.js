import { sirevi } from "./SireviPopis";


async function get() {
    return {success: true, data: [...sirevi]}
}

async function getById(id) {
    return {success: true, data: sirevi.find(s => s.id === parseInt(id))}    
}

async function dodaj(sir) {
    if(sirevi.length === 0) {
        sir.id = 1 
    }else{
        sir.id = sirevi[sirevi.length - 1].id + 1
    }
    sirevi.push(sir)
}

async function promjeni(id, sir) {
    const index = nadiIndex(id)
    sirevi[index] = {...sirevi[index], ...sir}    
}

function nadiIndex(id){
    return sirevi.findIndex(s => s.id === parseInt(id))
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