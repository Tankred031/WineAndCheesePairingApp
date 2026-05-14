import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Button, Modal, Pagination } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import VinaPregledGrid from "./VinaPregledGrid"
import VinaPregledTablica from "./VinaPregledTablica"
import { generirajVinaPDF } from "../../components/VinaPDFGenerator"
import { generirajExcel } from "../../components/ExcelGenerator"
import useLoading from "../../hooks/useLoading"


export default function VinaPregled() {

    const navigate = useNavigate()
    const [vina, setVina] = useState([])
    const [pojam, setPojam] = useState('')
    const sirina = useBreakpoint()

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const { showLoading, hideLoading } = useLoading()

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    const TIPOVI_VINA = [
        { id: '1', naziv: 'crveno' },
        { id: '2', naziv: 'bijelo' },
        { id: '3', naziv: 'pjenušavo' },
        { id: '4', naziv: 'desertno' },
        { id: '5', naziv: 'rose' }
    ]

    const SLATKOCE = [
        { id: '1', naziv: 'suho' },
        { id: '2', naziv: 'polusuho' },
        { id: '3', naziv: 'poluslatko' },
        { id: '4', naziv: 'slatko' }
    ]

    const round1 = (num) => Math.round(num * 10) / 10;

    function getSlatkocaNaziv(id) {
        return SLATKOCE.find(s => s.id === id)?.naziv || ''
    }

    function getTipNaziv(id) {
        return TIPOVI_VINA.find(t => t.id === id)?.naziv || ''
    }

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // 🔥 1. FILTRIRANJE (svi podaci)
    const filtriranaVina = vina.filter(v => {
        const pojamLower = pojam.toLowerCase()

        const broj = parseFloat(pojam.replace(',', '.'))
        const jeBroj = !isNaN(broj)

        return (
            v.naziv?.toLowerCase().includes(pojamLower) ||
            getTipNaziv(v.tip_id)?.toLowerCase().includes(pojamLower) ||
            v.regija?.toLowerCase().includes(pojamLower) ||
            getSlatkocaNaziv(v.slatkoca_id)?.toLowerCase().includes(pojamLower) ||
            v.arome?.toLowerCase().includes(pojamLower) ||
            v.tijelo?.toLowerCase().includes(pojamLower) ||

            (jeBroj &&
                broj >= round1(v.alkohol_min) &&
                broj <= round1(v.alkohol_max)
            ))
    })

    // 🔥 2. PAGINACIJA NA FILTERU
    const totalPages = Math.ceil(filtriranaVina.length / pageSize)

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    const paginatedVina = filtriranaVina.slice(startIndex, endIndex)

    useEffect(() => {
        ucitajVina()
    }, [])

    async function ucitajVina() {
        showLoading("Učitavam podatke...")
        const odgovor = await VinaService.get()


        if (!odgovor.success) {
            alert('Nije implementiran servis')
            return
        }

        setVina(odgovor.data)
        hideLoading()
    }

    function handlePageChange(page) {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    // --- BRISANJE ---

    function obrisi(id) {
        setDeleteId(id);
        setShowDelete(true);
    }
    async function potvrdiBrisanje() {

        showLoading("Brišem podatke...");

        await VinaService.obrisi(deleteId);
        await delay(800);

        setShowDelete(false);
        setDeleteId(null);

        await ucitajVina();

        hideLoading();
    }

    return (
        <>
            <Link to={RouteNames.VINA_NOVI} className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog vina
            </Link>

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4 className="section-title">Popis vina</h4>

                <div className="d-flex gap-2 w-50 justify-content-end">

                    {!['xs', 'sm', 'md'].includes(sirina) && (
                        <>

                            <Button
                                variant="light"
                                style={{ color: 'darkgreen', fontWeight: 'bold', border: '1px solid lightgrey' }}
                                onClick={() =>
                                    generirajExcel(
                                        filtriranaVina.map(v => ({
                                            Naziv: v.naziv,
                                            Regija: v.regija,
                                            Arome: v.arome,
                                            Tijelo: v.tijelo
                                        })),
                                        "vina",
                                        "Vina"
                                    )
                                }
                            >
                                Excel export
                            </Button>

                            <Button
                                variant="light"
                                style={{ color: 'crimson', fontWeight: 'bold', border: '1px solid lightgrey' }}
                                onClick={() => generirajVinaPDF(filtriranaVina, {
                                    getTipNaziv,
                                    getSlatkocaNaziv,
                                    format1dec
                                })}
                            >
                                Generiraj PDF
                            </Button>

                        </>
                    )}

                    <input
                        type="text"
                        placeholder={
                            ['xs', 'sm', 'md'].includes(sirina)
                                ? "Traži..."
                                : "Traži vino..."
                        }
                        className="form-control w-25"
                        style={{
                            backgroundColor: "lightgrey",
                            border: "2px solid grey"
                        }}
                        value={pojam}
                        onChange={(e) => {
                            setPojam(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                </div>
            </div>

            {/* GRID / TABLICA */}
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <VinaPregledGrid
                    vina={filtriranaVina}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            ) : (
                <VinaPregledTablica
                    vina={paginatedVina}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            )}

            <p className="mt-2">
                {vina.length === 0
                    ? "Nema učitanih vina"
                    : <>Učitano ukupno <strong>{vina.length}</strong> vina</>}
            </p>

            {/* PAGINATION */}

            {totalPages > 1 && !['xs', 'sm', 'md'].includes(sirina) && (

                <div className="d-flex justify-content-center">
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
            )}

            <Modal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Potvrda brisanja
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Želite li trajno obrisati ovaj zapis?
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowDelete(false)}
                    >
                        Odustani
                    </Button>

                    <Button
                        variant="danger"
                        onClick={potvrdiBrisanje}
                    >
                        Obriši
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}