import { PrefixStorage } from "../../constants";

function dohvatiListu() {

    const podaci =
        localStorage.getItem(
            PrefixStorage.UPARIVANJA
        );

    return podaci
        ? JSON.parse(podaci)
        : [];
}

function spremiListu(lista) {

    localStorage.setItem(
        PrefixStorage.UPARIVANJA,
        JSON.stringify(lista)
    );
}

function dohvatiObrisane() {

    const podaci =
        localStorage.getItem(
            "obrisaniUparivanja"
        );

    return podaci
        ? JSON.parse(podaci)
        : [];
}

function spremiObrisane(obrisani) {

    localStorage.setItem(
        "obrisaniUparivanja",
        JSON.stringify(obrisani)
    );
}

export default {

    get: async () => ({

        success: true,

        data: dohvatiListu()
    }),

    dodaj: async (uparivanje) => {

        let lista =
            dohvatiListu();

        uparivanje.id =
            String(Date.now());

        lista.push(uparivanje);

        spremiListu(lista);

        return {
            success: true
        };
    },

    getById: async (id) => ({

        success: true,

        data: dohvatiListu().find(
            u => u.id === id
        )
    }),

    promjeni: async (id, novo) => {

        let lista =
            dohvatiListu();

        let index = lista.findIndex(
            u => u.id === id
        );

        if (index !== -1) {

            lista[index] = {
                ...novo,
                id
            };

            spremiListu(lista);
        }
        return {
            success: true
        };
    },

    obrisi: async (id) => {

        let lista =
            dohvatiListu();

        lista = lista.filter(
            u => u.id !== id
        );

        spremiListu(lista);
        return {
            success: true
        };
    },

    postavi: async (novaLista) => {

        spremiListu(novaLista);
        return {
            success: true
        };
    },

    getObrisani: async () => ({

        success: true,
        data: dohvatiObrisane()
    }),

    dodajObrisani: async (
        vinoId,
        sirId
    ) => {

        let obrisani =
            dohvatiObrisane();

        obrisani.push({
            vinoId,
            sirId
        });

        spremiObrisane(obrisani);
        return {
            success: true
        };
    },

    resetObrisani: async () => {
        spremiObrisane([]);
        return {
            success: true
        };
    }
}