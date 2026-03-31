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
    getBySifra: async (id) => ({ success: false, data: {} }),
    dodaj: async (sir) => {console.error("Servis nije učitan"); },
    promjeni: async (id, sir) => { console.error("Servise nije učitan"); },
    obrisi: async (id, sir) => { console.error("Servis nije učitan"); }
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (id) => AktivniServis.getById(id),
    dodaj: (sir) => AktivniServis.dodaj(sir),
    promjeni: (id, sir) => AktivniServis.promjeni(id, sir),
    obrisi: (id, sir) => AktivniServis.obrisi(id)
}