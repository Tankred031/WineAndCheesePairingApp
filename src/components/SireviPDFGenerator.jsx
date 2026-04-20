import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generirajSireviPDF = async (sirevi, helperi) => {
    const { getVrstaNaziv, getTipNaziv, getZrenjeNaziv, getIntezitetNaziv, getMasnocaNaziv } = helperi;

    const fetchFontAsBase64 = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            console.error("Greška kod učitavanja fonta", e);
            return null;
        }
    };

    const doc = new jsPDF();

    // Fontovi
     const [regBase64, boldBase64] = await Promise.all([
        fetchFontAsBase64('/src/assets/fonts/Outfit-Regular.ttf'),
        fetchFontAsBase64('/src/assets/fonts/Outfit-Bold.tff')
    ]);

    if (regBase64 && boldBase64) {
        doc.addFileToVFS('Outfit-Regular.ttf', regBase64);
        doc.addFont('Outfit-Regular.ttf', 'Outfit', 'normal');

        doc.addFileToVFS('Outfit-Bold.ttf', boldBase64);
        doc.addFont('Outfit-Bold.ttf', 'Outfit', 'bold');

        doc.setFont('Outfit', 'normal');
    }


    // Zaglavlje
    doc.setFontSize(20);
    doc.setTextColor(46, 125, 50);
    doc.text('WINE & CHEESE', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text('EVIDENCIJA I PREGLED SIREVA', 20, 27);

    doc.setFont('Outfit', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('POPIS SIREVA', 20, 45);

    doc.setDrawColor(46, 125, 50);
    doc.setLineWidth(0.5);
    doc.line(20, 48, 190, 48);

    // Tablica
    const tableData = sirevi.map(s => [
        s.naziv,
        getTipNaziv(s.tip_id),
        getVrstaNaziv(s.vrsta_id),
        getZrenjeNaziv(s.zrenje_id),
        s.regija,
        getIntezitetNaziv(s.intezitet_id),
        getMasnocaNaziv(s.masnoca_id)
    ]);

    autoTable(doc, {
        startY: 55,
        head: [['Naziv', 'Tip', 'Vrsta', 'Zrenje', 'Regija', 'Intenzitet', 'Masnoća']],
        body: tableData,
        styles: {
            font: 'Outfit-Regular',
            fontStyle: 'normal',
            fontSize: 9,
        },
        headStyles: {
            fillColor: [46, 125, 50],
            font: 'Outfit-bold',
            fontStyle: 'bold'
        },
        margin: { left: 15, right: 15 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Stranica ${i} od ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
};
