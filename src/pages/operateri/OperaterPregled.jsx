import { useEffect, useState } from "react"
import OperaterService from "../../services/operateri/OperaterService"
import { Table, Button, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import { FaEdit, FaTrash, FaKey } from "react-icons/fa"

export default function OperaterPregled() {

    const navigate = useNavigate()
    const [operateri, setOperateri] = useState([])

    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => { document.title = 'Operateri, ' + IME_APLIKACIJE })

    useEffect(() => {
        ucitajOperatere()
    }, [])

    async function ucitajOperatere() {
        await OperaterService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setOperateri(odgovor.data)
        })
    }

    function brisanje(sifra) {
        setDeleteId(sifra)
        setShowDelete(true)
    }

    async function potvrdiBrisanje() {

        const rezultat = await OperaterService.obrisi(deleteId)

        if (rezultat.success) {
            await ucitajOperatere()
        } else {
            alert(rezultat.message || 'Greška pri brisanju')
        }

        setShowDelete(false)
        setDeleteId(null)
    }

    return (
        <>
            <Link to={RouteNames.OPERATERI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog operatera
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Uloga</th>
                        <th className="text-center" style={{ width: '200px' }}>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {operateri && operateri.map((operater) => (
                        <tr key={operater.sifra}>
                            <td>{operater.email}</td>
                            <td>
                                <span className={`badge ${operater.uloga === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                    {operater.uloga}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="d-flex gap-2 justify-content-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}`)}
                                        title="Promjeni email"
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                                        title="Promjeni lozinku"
                                    >
                                        <FaKey />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => brisanje(operater.sifra)}
                                        title="Obriši"
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
                    Želite li trajno obrisati ovog operatera?
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