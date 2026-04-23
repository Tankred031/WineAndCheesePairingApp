import { vina } from "./VinaPopis";


async function get() {
    return { success: true, data: [...vina] }
}

async function getById(id) {
    return { success: true, data: vina.find(s => s.id === parseInt(id)) }
}

async function dodaj(vino) {
    if (vina.length === 0) {
        vino.id = 1
    } else {
        vino.id = vina[vina.length - 1].id + 1
    }
    vina.push(vino)
}

async function promjeni(id, vino) {
    const index = nadiIndex(id)
    vina[index] = { ...vina[index], ...vino }
    if (index === -1) return { success: false, message: "Vino nije pronađeno"}

    vina[index] = { ...vina[index], ...vino }
    return { success: true }
}

function nadiIndex(id) {
    return vina.findIndex(s => s.id === parseInt(id))
}

async function obrisi(id) {
    const index = nadiIndex(id)
    if (index === -1) return { success: false, message: "Vino nije pronađeno" }

        vina.splice(index, 1)
        return { success: true }   
    
}

// Straničenje - dohvati stranicu polaznika
async function getPage(page = 1, pageSize = 8) {
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
}