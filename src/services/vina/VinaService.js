import VinaServiceLocalStorage from "./VinaServiceLocalStorage";
import VinaServiceMemorija from "./VinaServiceMemorija";
import { DATA_SOURCE } from "../../constants";
import VinaServiceFireBase from "./VinaServiceFireBase";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = VinaServiceMemorija;
        break;
    case 'localStorage':
        Servis = VinaServiceLocalStorage;
        break;
    case 'firebase':
        Servis = VinaServiceFireBase;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () =>({ success: false, data: []}),
    getById: async (id) => ({ success: false, data: {} }),
    dodaj: async (vino) => {console.error("Servis nije učitan"); },
    promjeni: async (id, vino) => { console.error("Servis nije učitan"); },
    obrisi: async (id) => { console.error("Servis nije učitan"); },
    getPage: async (page, pageSize) => ({ success: false, data: [], totalPages: 0, totalItems: 0 })
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getById: (id) => AktivniServis.getById(id),
    dodaj: (vino) => AktivniServis.dodaj(vino),
    promjeni: (id, vino) => AktivniServis.promjeni(id, vino),
    obrisi: (id) => AktivniServis.obrisi(id),
    getPage: (page, pageSize) => AktivniServis.getPage(page, pageSize)
}