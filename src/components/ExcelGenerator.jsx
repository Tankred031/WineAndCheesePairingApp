import * as XLSX from "xlsx";

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
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, `${filename}.xlsx`);
}