import SireviServiceLocalStorage from "./SireviServiceLocalStorage";
import SireviServiceMemorija from "./SireviServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
            Servis = SireviServiceMemorija;
            break;
        case 'localStorage':
            Servis = SireviServiceLocalStorage;
            break;        
        default:
            Servis = null;
    }


const PrazanServis = {
    get: async () =>({ success: false, data: []}),
    getById: async (id) => ({ success: false, data: {} }),
    dodaj: async (sir) => {console.error("Servis nije učitan"); return {success: false, message: "Servis nije učitan"}},
    promjeni: async (id, sir) => { console.error("Servis nije učitan"); return {success: false, message: "Servis nije učitan"}},
    obrisi: async (id) => { console.error("Servis nije učitan"); return {success: false, message: "Servis nije učitan"}},
    getPage: async (page, pageSize) => ({ success: false, data: [], totalPages: 0, totalItems: 0 })
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getById: (id) => AktivniServis.getById(id),
    dodaj: (sir) => AktivniServis.dodaj(sir),
    promjeni: (id, sir) => AktivniServis.promjeni(id, sir),
    obrisi: (id) => AktivniServis.obrisi(id),
    getPage: (page, pageSize) => AktivniServis.getPage(page, pageSize)
}