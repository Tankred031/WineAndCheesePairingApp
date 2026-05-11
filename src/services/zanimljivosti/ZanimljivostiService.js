import { DATA_SOURCE } from "../../constants";

import memorija from "./ZanimljivostiServiceMemorija";
import local from "./ZanimljivostiServiceLocalStorage";
import firebase from "./ZanimljivostiServiceFireBase"

let service;

switch (DATA_SOURCE) {
    case 'localStorage':
        service = local;
        break;
    case 'firebase':
        service = firebase;
        break;
    case 'memorija':
    default:
        service = memorija;
}

export default service;
