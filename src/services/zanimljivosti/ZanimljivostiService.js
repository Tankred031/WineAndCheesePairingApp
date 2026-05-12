import memorija from "./ZanimljivostiServiceMemorija";
import local from "./ZanimljivostiServiceLocalStorage";
import { DATA_SOURCE } from "../../constants";

let service;

switch (DATA_SOURCE) {

    case 'localStorage':
        service = local;
        break;

    case 'memorija':
    default:
        service = memorija;
        break;
}

export default service;