const STORAGE_KEY = 'sirevi'


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiULocalStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const sirevi = dohvatiSveIzStorage();
    return {success: true, data: [...sirevi] };
}

async function getById(id) {
    const sirevi = dohvatiSveIzStorage();
    const sir = sirevi.find(s => s.id === parseInt(id));
    return {success: true, data: sir };    
}

async function dodaj(sir) {
    const sirevi = dohvatiSveIzStorage();

    if(sirevi.length === 0) {
        sir.id = 1
    } else {
        const maxId = Math.max(...sirevi.map(s => s.id));
        sir.id = maxId + 1;
    }
    
    sirevi.push(sir);
    spremiULocalStorage(sirevi);
    return { data: sir };
}

async function promjeni(id, sir) {
    const sirevi = dohvatiSveIzStorage();
    const index = sirevi.findIndex(s => s.id === parseInt(id));

    if (index !== -1) {
        sirevi[index] =  {...sirevi[index], ...sir};
        spremiULocalStorage(sirevi);
    }
    return { data: sirevi[index] };   
}

async function obrisi(id) {
    let sirevi = dohvatiSveIzStorage();
    sirevi = sirevi.filter(s => s.id !== parseInt(id));
    spremiULocalStorage(sirevi);
    return { message: 'Obrisano' };    
}

export default{
    get, 
    dodaj,
    getById,
    promjeni,
    obrisi
};