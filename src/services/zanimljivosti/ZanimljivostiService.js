import { DATA_SOURCE } from "../../constants";

import * as memorija from "./ZanimljivostiServiceMemorija";
import * as local from "./ZanimljivostiServiceLocalStorage";

let service;

switch (DATA_SOURCE) {
    case 'localStorage':
        service = local;
        break;
    case 'memorija':
    default:
        service = memorija;
}

export const getCards = service.getCards;
export const addCard = service.addCard;