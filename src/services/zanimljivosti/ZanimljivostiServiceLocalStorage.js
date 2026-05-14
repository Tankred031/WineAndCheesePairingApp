import { PrefixStorage } from "../../constants";

// helperi
function dohvatiSveIzStorage() {
    try {
        const data = localStorage.getItem(PrefixStorage.CLANCI);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function spremiULocalStorage(data) {
    localStorage.setItem(PrefixStorage.CLANCI, JSON.stringify(data));
}

// GET
async function get() {
    const cards = dohvatiSveIzStorage();
    return { success: true, data: cards };
}

async function getById(id) {
    const cards =
        dohvatiSveIzStorage();
    const card =
        cards.find(
            c => c.id === parseInt(id, 10)
        );
    if (!card) {
        return {
            success: false,
            message: "Članak nije pronađen"
        };
    }
    return {
        success: true,
        data: card
    };
}


// ADD
async function dodaj(card) {
    if (!card.title || !card.text) {
        return { success: false, message: "Nedostaje title ili text" };
    }

    const existing = dohvatiSveIzStorage();

    const novi = {
        ...card,
        id: Date.now()
    };

    const updated = [...existing, novi];

    spremiULocalStorage(updated);

    return { success: true, data: novi };
}

// UPDATE

async function promjeni(id, noviPodaci) {
    const existing =
        dohvatiSveIzStorage();

    const index =
        existing.findIndex(
            c => c.id === parseInt(id, 10)
        );

    if (index === -1) {
        return {
            success: false,
            message:
                "Članak nije pronađen"
        };
    }

    existing[index] = {
        ...existing[index],
        ...noviPodaci,
        id: existing[index].id
    };

    spremiULocalStorage(existing);
    return {
        success: true,
        data: existing[index]
    };
}

// DELETE 
async function obrisi(id) {
    const existing = dohvatiSveIzStorage();
    const nova = existing.filter(c => c.id !== parseInt(id, 10));

    spremiULocalStorage(nova);

    return { success: true };
}

export default {
    get,
    getById,
    dodaj,
    obrisi,
    promjeni
};