import { DATA_SOURCE } from "../../constants";

import memorija from "./ZanimljivostiServiceMemorija";
import local from "./ZanimljivostiServiceLocalStorage";

let service;

switch (DATA_SOURCE) {
    case 'localStorage':
        service = local;
        break;
    case 'memorija':
    default:
        service = memorija;
}

export default service;
