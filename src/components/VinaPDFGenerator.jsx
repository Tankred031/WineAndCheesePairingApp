import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generirajVinaPDF = async (vina, helperi) => {
    const { getTipNaziv, getSlatkocaNaziv, format1dec } = helperi;

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

    const doc = new jsPDF('landscape'); // 'landscape' jer imaš puno stupaca

    // Fontovi
    const [regBase64, boldBase64] = await Promise.all([
        fetchFontAsBase64('/fonts/Outfit-Regular.ttf'),
        fetchFontAsBase64('/fonts/Outfit-Bold.ttf')
    ]);

    if (regBase64 && boldBase64) {
        doc.addFileToVFS('Outfit-Regular.ttf', regBase64);
        doc.addFont('Outfit-Regular.ttf', 'Outfit', 'normal');

        doc.addFileToVFS('Outfit-Bold.ttf', boldBase64);
        doc.addFont('Outfit-Bold.ttf', 'Outfit', 'bold');

        doc.setFont('Outfit', 'normal');
    }

    // Zaglavlje
    doc.setFontSize(22);
    doc.setTextColor(128, 0, 0); // Vinska crvena
    doc.text('WINE & CHEESE', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text('EVIDENCIJA I PREGLED VINA', 20, 27);

    doc.setFont('Outfit', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('POPIS VINA', 20, 45);

    doc.setDrawColor(128, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 48, 275, 48); // Duža linija za landscape

    // Priprema podataka
    const tableData = vina.map(v => [
        v.naziv,
        getTipNaziv(v.tip_id),
        v.regija,
        `${format1dec(v.temperatura_min)} - ${format1dec(v.temperatura_max)} °C`,
        getSlatkocaNaziv(v.slatkoca_id),
        v.arome,
        v.tijelo,
        `${format1dec(v.alkohol_min)} - ${format1dec(v.alkohol_max)} %`
    ]);

    autoTable(doc, {
        startY: 55,
        head: [['Naziv', 'Tip', 'Regija', 'Temp.', 'Slatkoća', 'Arome', 'Tijelo', 'Alkohol']],
        body: tableData,
        styles: {
            font: 'Outfit',
            fontSize: 9,
            overflow: 'linebreak',
            fontStyle: 'normal'
        },
        headStyles: {
            fillColor: [128, 0, 0],
            font: 'Outfit',
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 40 }, // Naziv
            5: { cellWidth: 50 }, // Arome često budu dugačke
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
