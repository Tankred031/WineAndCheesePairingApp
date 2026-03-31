const STORAGE_KEY = 'vina'


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiULocalStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const vina = dohvatiSveIzStorage();
    return {success: true, data: [...vina] };
}

async function getById(id) {
    const vina = dohvatiSveIzStorage();
    const vino = vina.find(s => s.id === parseInt(id));
    return {success: true, data: vino };    
}

async function dodaj(vino) {
    const vina = dohvatiSveIzStorage();

    if(vina.length === 0) {
        vino.id = 1
    } else {
        const maxId = Math.max(...vina.map(s => s.id));
        vino.id = maxId + 1;
    }
    
    vina.push(vino);
    spremiULocalStorage(vina);
    return { data: vino };
}

async function promjeni(id, vino) {
    const vina = dohvatiSveIzStorage();
    const index = vina.findIndex(s => s.id === parseInt(id));

    if (index !== -1) {
        vina[index] =  {...vina[index], ...vino};
        spremiULocalStorage(vina);
    }
    return { data: vina[index] };   
}

async function obrisi(id) {
    let vina = dohvatiSveIzStorage();
    vina = vina.filter(s => s.id !== parseInt(id));
    spremiULocalStorage(vina);
    return { message: 'Obrisano' };    
}

export default{
    get, 
    dodaj,
    getById,
    promjeni,
    obrisi
};