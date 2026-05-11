import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

// GET
async function get() {

    try {

        const querySnapshot = await getDocs(
            collection(getFirebaseDB(), PrefixStorage.CLANCI)
        );

        const cards = querySnapshot.docs.map(docItem => ({
            id: docItem.id,
            ...docItem.data()
        }));

        return {
            success: true,
            data: cards
        };

    } catch (e) {

        console.error(
            "Greška kod dohvaćanja članaka:",
            e
        );

        return {
            success: false,
            message: e.message,
            data: []
        };
    }
}

// ADD
async function dodaj(card) {

    try {

        if (!card.title || !card.text) {

            return {
                success: false,
                message: "Nedostaje title ili text"
            };
        }

        const cardBezId = { ...card };
        delete cardBezId.id;

        const docRef = await addDoc(
            collection(
                getFirebaseDB(),
                PrefixStorage.CLANCI
            ),
            cardBezId
        );

        return {
            success: true,
            data: {
                id: docRef.id,
                ...cardBezId
            }
        };

    } catch (e) {

        console.error(
            "Greška kod dodavanja članka:",
            e
        );

        return {
            success: false,
            message: e.message
        };
    }
}

// DELETE
async function obrisi(id) {

    try {

        const docRef = doc(
            getFirebaseDB(),
            PrefixStorage.CLANCI,
            id
        );

        await deleteDoc(docRef);

        return {
            success: true
        };

    } catch (e) {

        console.error(
            "Greška kod brisanja članka:",
            e
        );

        return {
            success: false,
            message: e.message
        };
    }
}

export default {
    get,
    dodaj,
    obrisi
};