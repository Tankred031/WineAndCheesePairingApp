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
    return { success: true, data: [...vina] };
}

async function getById(id) {
    const vina = dohvatiSveIzStorage();
    const vino = vina.find(s => s.id === parseInt(id));
    return { success: true, data: vino };
}

async function dodaj(vino) {
    const vina = dohvatiSveIzStorage();

    if (vina.length === 0) {
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
        vina[index] = { ...vina[index], ...vino };
        spremiULocalStorage(vina);
    }
    return { data: vina[index] };
}

async function obrisi(id) {
    const vina = dohvatiSveIzStorage();
    const nova = vina.filter(s => s.id !== parseInt(id));

    if (nova.length === vina.length) {
        return { success: false, message: "Vino nije pronađeno" };
    }

    spremiULocalStorage(vina);
    return { success: true };
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8) {
    const vina = dohvatiSveIzStorage();

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = vina.slice(startIndex, endIndex);
    const totalItems = vina.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        success: true,
        data: paginatedData,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems
    };
}

export default {
    get,
    dodaj,
    getById,
    promjeni,
    obrisi,
    getPage
};