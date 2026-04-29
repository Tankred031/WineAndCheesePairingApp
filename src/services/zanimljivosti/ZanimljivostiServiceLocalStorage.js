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

// DELETE (bonus — dobro imati)
async function obrisi(id) {
    const existing = dohvatiSveIzStorage();
    const nova = existing.filter(c => c.id !== parseInt(id, 10));

    spremiULocalStorage(nova);

    return { success: true };
}

export default {
    get,
    dodaj,
    obrisi
};