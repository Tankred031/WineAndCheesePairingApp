import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generirajUparivanjePDF = async (glavniNaziv, odabraneStavke, tip) => {

    // Učitavanje fonta (Base64)
    const fetchFont = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            return null;
        }
    };

    const doc = new jsPDF();

    // Učitaj oba fonta
    const [regularBase64, boldBase64] = await Promise.all([
        fetchFont('/fonts/Outfit-Regular.ttf'),
        fetchFont('/fonts/Outfit-Bold.ttf')
    ]);

    let fontName = 'helvetica';

    if (regularBase64 && boldBase64) {
        doc.addFileToVFS('Outfit-Regular.ttf', regularBase64);
        doc.addFont('Outfit-Regular.ttf', 'Outfit', 'normal');

        doc.addFileToVFS('Outfit-Bold.ttf', boldBase64);
        doc.addFont('Outfit-Bold.ttf', 'Outfit', 'bold');

        fontName = 'Outfit';
    }

    // NASLOVI
    doc.setFont(fontName, 'bold');
    doc.setFontSize(22);
    doc.setTextColor(128, 0, 0);
    doc.text('WINE & CHEESE', 20, 20);

    doc.setFont(fontName, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('UPARIVANJE VINA I SIREVA', 20, 27);

    doc.setFont(fontName, 'normal');
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Popis za: ${glavniNaziv || ''}`, 20, 38, {
        encoding: 'Identity-H'
    });

    // LINIJA
    doc.setDrawColor(128, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // TABLICA
    const tableData = odabraneStavke.map(s => [s.naziv || '']);

    autoTable(doc, {
        startY: 48,
        head: [[tip === 'sir' ? 'Preporučena vina' : 'Preporučeni sirevi']],
        body: tableData,

        styles: {
            font: fontName,
            fontSize: 11,
            cellPadding: 4,
            textColor: 50
        },

        headStyles: {
            fillColor: [128, 0, 0],
            textColor: 255,
            fontStyle: 'bold'
        },

        alternateRowStyles: {
            fillColor: [240, 240, 240]
        },

        tableLineWidth: 0,
        tableLineColor: [255, 255, 255]
    });

    // OTVORI PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
};