let cards = [];

async function get() {
    return { success: true, data: cards };
}

async function dodaj(card) {
    if (!card.title || !card.text) {
        return { success: false };
    }

    const novi = {
        ...card,
        id: Date.now()
    };

    cards = [...cards, novi];

    return { success: true, data: novi };
}

async function obrisi(id) {
    cards = cards.filter(c => c.id !== parseInt(id));
    return { success: true };
}

export default {
    get,
    dodaj,
    obrisi
};