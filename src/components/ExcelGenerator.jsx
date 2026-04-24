import * as XLSX from "xlsx-js-style"

/**
 * Generički Excel export
 * @param {Array} data - podaci (array objekata)
 * @param {string} filename - ime filea
 * @param {string} sheetName - ime sheet-a
 */
export function generirajExcel(data, filename = "export", sheetName = "Sheet1") {

    if (!data || data.length === 0) {
        alert("Nema podataka za export");
        return;
    }

    const ws = XLSX.utils.json_to_sheet(data);

    // Autofit
    const colWidths = Object.keys(data[0]).map(key => {
        const maxLength = Math.max(
            key.length,
            ...data.map(row => {
                const value = row[key];
                return value ? value.toString().length : 0;
            })
        );

        return {
            wch: Math.min(Math.max(maxLength, 10) + 2, 50)
        }
    })

    ws['!cols'] = colWidths;


    // Prvi redak - bold
    const range = XLSX.utils.decode_range(ws['!ref']);

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });

        if (!ws[cellAddress]) continue;

        ws[cellAddress].s = {
            font: { bold: true }
        };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, `${filename}.xlsx`);
}

