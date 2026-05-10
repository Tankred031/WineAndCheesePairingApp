import { PrefixStorage } from '../../constants';

// Pomoćna funkcija za dohvaćanje podataka
function dohvatiSveIzStorage() {

    const podaci =
        localStorage.getItem(PrefixStorage.VINA);

    return podaci
        ? JSON.parse(podaci)
        : [];
}

// Pomoćna funkcija za spremanje
function spremiULocalStorage(podaci) {

    localStorage.setItem(
        PrefixStorage.VINA,
        JSON.stringify(podaci)
    );
}

async function get() {

    const vina = dohvatiSveIzStorage();

    return {
        success: true,
        data: [...vina]
    };
}

async function getById(id) {

    const vina = dohvatiSveIzStorage();

    const vino =
        vina.find(s => s.id === id);

    return {
        success: true,
        data: vino
    };
}

async function dodaj(vino) {

    const vina = dohvatiSveIzStorage();

    if (vina.length === 0) {

        vino.id = '1';

    } else {

        const maxId = Math.max(
            ...vina.map(v => parseInt(v.id))
        );

        vino.id = String(maxId + 1);
    }

    vina.push(vino);

    spremiULocalStorage(vina);

    return {
        success: true,
        data: vino
    };
}

async function promjeni(id, vino) {

    const vina = dohvatiSveIzStorage();

    const index =
        vina.findIndex(v => v.id === id);

    if (index === -1) {

        return {
            success: false,
            message: 'Vino nije pronađeno'
        };
    }

    vina[index] = {
        ...vina[index],
        ...vino
    };

    spremiULocalStorage(vina);

    return {
        success: true,
        data: vina[index]
    };
}

async function obrisi(id) {

    const vina = dohvatiSveIzStorage();

    const nova =
        vina.filter(v => v.id !== id);

    if (nova.length === vina.length) {

        return {
            success: false,
            message: 'Vino nije pronađeno'
        };
    }

    spremiULocalStorage(nova);

    return {
        success: true
    };
}


// Straničenje
async function getPage(page = 1, pageSize = 8) {

    const vina = dohvatiSveIzStorage();

    const startIndex =
        (page - 1) * pageSize;

    const endIndex =
        startIndex + pageSize;

    const paginatedData =
        vina.slice(startIndex, endIndex);

    const totalItems = vina.length;

    const totalPages =
        Math.ceil(totalItems / pageSize);

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