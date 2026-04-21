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
    doc.setFont('Outfit', 'normal');
    doc.setFontSize(20);
    doc.setTextColor(123, 3, 35); 
    doc.text('WINE & CHEESE PAIRING', 20, 20);

    doc.setFont('Outfit', 'normal');
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


