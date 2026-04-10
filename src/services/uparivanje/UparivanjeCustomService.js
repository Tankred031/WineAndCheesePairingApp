let lista = []
let obrisani = []

export default {

    get: async () => ({
        success: true,
        data: lista
    }),

    dodaj: async (uparivanje) => {
        uparivanje.id = Date.now()
        lista.push(uparivanje)
        return { success: true }
    },

    getById: async (id) => ({
        success: true,
        data: lista.find(u => u.id == id)
    }),

    promjeni: async (id, novo) => {
        let index = lista.findIndex(u => u.id == id)
        lista[index] = { ...novo, id }
        return { success: true }
    },


    obrisi: async (id) => {
        lista = lista.filter(u => u.id != id)
        return { success: true }
    },

    postavi: async (novaLista) => {
        lista = novaLista
        return { success: true }
    }, 

    getObrisani: async () => ({
        success: true,
        data: obrisani
    }),

    dodajObrisani: async (vinoId, sirId) => {
        obrisani.push({ vinoId, sirId });
        return { success: true };
    },

    resetObrisani: async () => {
        obrisani = [];
        return { success: true}
    }
}