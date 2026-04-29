import { PrefixStorage } from "../../constants";

// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.SIREVI);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiULocalStorage(podaci) {
    localStorage.setItem(PrefixStorage.SIREVI, JSON.stringify(podaci));
}

async function get() {
    const sirevi = dohvatiSveIzStorage();
    return { success: true, data: [...sirevi] };
}

async function getById(id) {
    const sirevi = dohvatiSveIzStorage();
    const sir = sirevi.find(s => s.id === parseInt(id));
    return { success: true, data: sir };
}

async function dodaj(sir) {
    const sirevi = dohvatiSveIzStorage();

    if (sirevi.length === 0) {
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
        sirevi[index] = { ...sirevi[index], ...sir };
        spremiULocalStorage(sirevi);
    }
    return { data: sirevi[index] };
}

async function obrisi(id) {
    const sirevi = dohvatiSveIzStorage();
    const nova = sirevi.filter(s => s.id !== parseInt(id));

    if (nova.length === sirevi.length) {
        return { success: false, message: "Sir nije pronađen" };
    }

    spremiULocalStorage(nova);
    return { success: true };
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8) {
    const sirevi = dohvatiSveIzStorage();

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = sirevi.slice(startIndex, endIndex);
    const totalItems = sirevi.length;
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