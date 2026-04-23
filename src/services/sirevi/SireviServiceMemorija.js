import { sirevi } from "./SireviPopis";


async function get() {
    return { success: true, data: [...sirevi] }
}

async function getById(id) {
    return { success: true, data: sirevi.find(s => s.id === parseInt(id)) }
}

async function dodaj(sir) {
    if (sirevi.length === 0) {
        sir.id = 1
    } else {
        sir.id = sirevi[sirevi.length - 1].id + 1
    }
    sirevi.push(sir)
}

async function promjeni(id, sir) {
    const index = nadiIndex(id)
    sirevi[index] = { ...sirevi[index], ...sir }
    if (index === -1) return { success: false, message: "Sir nije pronađen" }

    sir[index] = { ...sirevi[index], ...sirevi }
    return { success: true }
}

function nadiIndex(id) {
    return sirevi.findIndex(s => s.id === parseInt(id))
}

async function obrisi(id) {
    const index = nadiIndex(id)
    if (index === -1) return { success: false, message: "Sir nije pronađen" }

    sirevi.splice(index, 1)
    return { success: true }
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8) {
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
}