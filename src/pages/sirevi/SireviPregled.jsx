import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { useNavigate } from "react-router-dom"
import useBreakpoint from "../../hooks/useBreakpoint"
import SireviPregledGrid from "./SireviPregledGrid"
import SireviPregledTablica from "./SireviPregledTablica"
import { generirajSireviPDF } from "../../components/SireviPDFGenerator"
import { Button, Pagination } from "react-bootstrap"
import { generirajExcel } from "../../components/ExcelGenerator"
import useLoading from "../../hooks/useLoading"

export default function SireviPregled() {

    const navigate = useNavigate();
    const sirina = useBreakpoint();

    const [sirevi, setSirevi] = useState([]);
    const [pojam, setPojam] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10

    const { showLoading, hideLoading } = useLoading();

    // --- Konstante ---
    const VRSTE = [
        { id: 1, naziv: "kravlji" }, { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" }, { id: 4, naziv: "miješano" }
    ]
    const MASNOCE = [
        { id: 1, naziv: "niske" }, { id: 2, naziv: "srednje" }, { id: 3, naziv: "visoke" }
    ]
    const TIPOVI = [
        { id: 1, naziv: "svježi" }, { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" }, { id: 4, naziv: "plavi" }, { id: 5, naziv: "ekstra tvrdi" }
    ]
    const ZRENJA = [
        { id: 1, naziv: "mladi" }, { id: 2, naziv: "srednje zreli" }, { id: 3, naziv: "dugo zreli" }
    ]
    const INTEZITETI = [
        { id: 1, naziv: "blagi" }, { id: 2, naziv: "srednji" }, { id: 3, naziv: "jaki" }
    ]

    // --- Helper funkcije ---
    function getVrstaNaziv(id) { return VRSTE.find(v => v.id === id)?.naziv || '' }
    function getMasnocaNaziv(id) { return MASNOCE.find(m => m.id === id)?.naziv || '' }
    function getTipNaziv(id) { return TIPOVI.find(t => t.id === id)?.naziv || '' }
    function getZrenjeNaziv(id) { return ZRENJA.find(z => z.id === id)?.naziv || '' }
    function getIntezitetNaziv(id) { return INTEZITETI.find(i => i.id === id)?.naziv || '' }


    // --- 1. UCITAVANJE ---
    useEffect(() => {
        ucitajSirevi()
    }, [])

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function ucitajSirevi() {
        showLoading("Učitavam podatke...")
        const odgovor = await SireviService.get()
        

        if (!odgovor.success) {
            alert('Nije implementiran servis')
            return
        }

        setSirevi(odgovor.data)
        hideLoading()
    }

    // --- 2. BRISANJE ---
    async function obrisi(id) {
        if (!confirm('Sigurno obrisati?')) return
        
        showLoading("Brišem podatke...")

        await SireviService.obrisi(id)
        await delay(800) // produži trajanje loadera 
        await ucitajSirevi()

        hideLoading()
    }

    // --- 3. FILTRIRANJE (SVI PODACI) ---
    const filtriraniSirevi = sirevi.filter(s => {
        const p = pojam.toLowerCase()

        return (
            s.naziv?.toLowerCase().includes(p) ||
            getTipNaziv(s.tip_id)?.toLowerCase().includes(p) ||
            getVrstaNaziv(s.vrsta_id)?.toLowerCase().includes(p) ||
            getZrenjeNaziv(s.zrenje_id)?.toLowerCase().includes(p) ||
            s.regija?.toLowerCase().includes(p) ||
            getIntezitetNaziv(s.intezitet_id)?.toLowerCase().includes(p) ||
            getMasnocaNaziv(s.masnoca_id)?.toLowerCase().includes(p) ||
            s.okus?.toLowerCase().includes(p)
        )
    })

    // reset page kad se traži
    function handleSearch(e) {
        setPojam(e.target.value)
        setCurrentPage(1)
    }

    function handlePageChange(page) {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    // --- 4. PAGINACIJA ---
    const totalPages = Math.ceil(filtriraniSirevi.length / pageSize)

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    const paginatedSirevi = filtriraniSirevi.slice(startIndex, endIndex)

    // --- RENDER ---
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4 className="section-title">Popis sireva</h4>

                <div className="d-flex gap-2 w-50 justify-content-end">

                    <Button
                        variant="light"
                        style={{ color: 'darkgreen', fontWeight: 'bold', border: '1px solid lightgrey' }}
                        onClick={() =>
                            generirajExcel(
                                filtriraniSirevi.map(s => ({
                                    Naziv: s.naziv,
                                    Vrsta: getVrstaNaziv(s.vrsta_id),
                                    Tip: getTipNaziv(s.tip_id),
                                    Regija: s.regija,
                                    Okus: s.okus
                                })),
                                "sirevi",
                                "Sirevi"
                            )
                        }
                    >
                        Excel export
                    </Button>

                    <Button
                        variant="light"
                        style={{ color: 'crimson', fontWeight: 'bold', border: '1px solid lightgrey' }}
                        onClick={() => generirajSireviPDF(filtriraniSirevi, {
                            getVrstaNaziv,
                            getTipNaziv,
                            getZrenjeNaziv,
                            getIntezitetNaziv,
                            getMasnocaNaziv
                        })}
                    >
                        Generiraj PDF
                    </Button>

                    <input
                        type="text"
                        placeholder="Traži sir..."
                        className="form-control w-25"
                        style={{
                            backgroundColor: "lightgrey",
                            border: "2px solid grey"
                        }}
                        value={pojam}
                        onChange={handleSearch}
                    />

                </div>
            </div >

            {/* GRID / TABLICA */}
            {
                ['xs', 'sm', 'md'].includes(sirina) ? (
                    <SireviPregledGrid
                        sirevi={paginatedSirevi}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <SireviPregledTablica
                        sirevi={paginatedSirevi}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                )
            }

            <p className="mt-2">
                {sirevi.length === 0
                    ? "Nema učitanih sireva"
                    : <>Učitano ukupno <strong>{sirevi.length}</strong> sireva</>}
            </p>

            {/* PAGINATION */}
            {
                totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">

                        <Pagination>

                            <Pagination.First
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                            />

                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1

                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                                ) {
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    )
                                }

                                if (
                                    pageNumber === currentPage - 3 ||
                                    pageNumber === currentPage + 3
                                ) {
                                    return <Pagination.Ellipsis key={pageNumber} disabled />
                                }

                                return null
                            })}

                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />

                            <Pagination.Last
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                            />

                        </Pagination>

                    </div>
                )
            }
        </>
    )
}