import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import getFirebaseDB from "../../firebase";
import { PrefixStorage } from "../../constants";

// GET ALL
async function get() {

    try {

        const querySnapshot = await getDocs(
            collection(getFirebaseDB(), PrefixStorage.SIREVI)
        );

        const sirevi = querySnapshot.docs.map(docItem => ({
            id: docItem.id,
            ...docItem.data()
        }));

        return {
            success: true,
            data: sirevi
        };

    } catch (e) {

        console.error("Greška kod dohvaćanja sireva:", e);

        return {
            success: false,
            message: e.message,
            data: []
        };
    }
}

// GET BY ID
async function getById(id) {

    try {

        const docRef = doc(
            getFirebaseDB(),
            PrefixStorage.SIREVI,
            id
        );

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            return {
                success: false,
                message: "Sir nije pronađen"
            };
        }

        return {
            success: true,
            data: {
                id: docSnap.id,
                ...docSnap.data()
            }
        };

    } catch (e) {

        console.error("Greška kod dohvaćanja sira:", e);

        return {
            success: false,
            message: e.message
        };
    }
}

// DODAJ
async function dodaj(sir) {

    try {

        const sirBezId = { ...sir };
        delete sirBezId.id;

        const docRef = await addDoc(
            collection(getFirebaseDB(), PrefixStorage.SIREVI),
            sirBezId
        );

        return {
            success: true,
            data: {
                id: docRef.id,
                ...sirBezId
            }
        };

    } catch (e) {

        console.error("Greška kod dodavanja sira:", e);

        return {
            success: false,
            message: e.message
        };
    }
}

// PROMJENI
async function promjeni(id, sir) {

    try {

        const sirBezId = { ...sir };
        delete sirBezId.id;

        const docRef = doc(
            getFirebaseDB(),
            PrefixStorage.SIREVI,
            id
        );

        await updateDoc(docRef, sirBezId);

        return {
            success: true
        };

    } catch (e) {

        console.error("Greška kod promjene sira:", e);

        return {
            success: false,
            message: e.message
        };
    }
}

// OBRIŠI
async function obrisi(id) {

    try {

        const docRef = doc(
            getFirebaseDB(),
            PrefixStorage.SIREVI,
            id
        );

        await deleteDoc(docRef);

        return {
            success: true,
            message: "Uspješno obrisano"
        };

    } catch (e) {

        console.error("Greška kod brisanja sira:", e);

        return {
            success: false,
            message: e.message
        };
    }
}

// PAGINATION
async function getPage(page = 1, pageSize = 8) {

    try {

        const rezultat = await get();

        if (!rezultat.success) {
            return rezultat;
        }

        const sirevi = rezultat.data;
        const startIndex =
            (page - 1) * pageSize;
        const endIndex =
            startIndex + pageSize;
        const paginatedData =
            sirevi.slice(startIndex, endIndex);
        const totalItems = sirevi.length;
        const totalPages =
            Math.ceil(totalItems / pageSize);

        return {

            success: true,
            data: paginatedData,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        };

    } catch (e) {

        console.error("Greška kod straničenja:", e);

        return {
            success: false,
            message: e.message,
            data: []
        };
    }
}

export default {
    get,
    getById,
    dodaj,
    promjeni,
    obrisi,
    getPage
};