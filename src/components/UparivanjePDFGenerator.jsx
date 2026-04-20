import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generirajUparivanjePDF = async (glavniNaziv, odabraneStavke, tip) => {
    
    // 1. Funkcija za učitavanje fonta (Base64)
    const fetchFont = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]); // Ključno: [1]
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            return null;
        }
    };

    const doc = new jsPDF();

    // 2. Učitaj font (Pobrini se da je Outfit-Regular.ttf u public/fonts/)
    const fontBase64 = await fetchFont('/fonts/Outfit-Regular.ttf');

    if (fontBase64) {
        doc.addFileToVFS('Outfit-Regular.ttf', fontBase64);
        doc.addFont('Outfit-Regular.ttf', 'Outfit', 'normal');
        doc.setFont('Outfit'); // Postavi ga odmah
    } else {
        doc.setFont('helvetica');
    }

    // 3. Naslovi
    doc.setFontSize(20);
    doc.setTextColor(123, 3, 35); 
    doc.text('WINE & CHEESE PAIRING', 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Popis za: ${glavniNaziv || ''}`, 20, 32);

    // 4. Tablica s podacima
    const tableData = odabraneStavke.map(s => [s.naziv || '']);

    autoTable(doc, {
        startY: 40,
        head: [[tip === 'sir' ? 'Preporučena vina:' : 'Preporučeni sirevi:']],
        body: tableData,
        styles: { 
            font: fontBase64 ? 'Outfit' : 'helvetica', // Koristi Outfit samo ako je učitan
            fontSize: 11,
            charSpace: 0 // DODANO: Osigurava da nema razmaka između slova
        },
        headStyles: { 
            fillColor: [123, 3, 35],
            font: fontBase64 ? 'Outfit' : 'helvetica'
        }
    });

    window.open(URL.createObjectURL(doc.output('blob')), '_blank');
};


/*
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generirajUparivanjePDF = (glavniNaziv, stavkeZaIspis, tip) => {
    try {
        const doc = new jsPDF();

        // Jednostavni naslovi
        doc.setFontSize(18);
        doc.text('WINE & CHEESE PAIRING', 20, 20);

        doc.setFontSize(12);
        doc.text(`${tip === 'sir' ? 'Sir' : 'Vino'}: ${glavniNaziv || ''}`, 20, 30);

        // Mapiramo podatke iz grida u tablicu (uzmi samo naziv)
        const tableData = stavkeZaIspis.map(s => [s.naziv || 'Bez naziva']);

        autoTable(doc, {
            startY: 35,
            head: [[tip === 'sir' ? 'Popis vina:' : 'Popis sireva:']],
            body: tableData,
            theme: 'grid', // Najjednostavnija tema koja sigurno radi
            styles: { font: 'helvetica' } 
        });

        // Otvaranje PDF-a u novom prozoru
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');

    } catch (error) {
        console.error("Greška kod PDF-a:", error);
        alert("Došlo je do greške, provjeri jesu li podaci ispravni.");
    }
};
*/