import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaLink, FaTrash } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SireviPregledGrid({ sirevi, navigate, obrisi }) {

    const VRSTE = [
        { id: '1', naziv: 'kravlji' },
        { id: '2', naziv: 'ovčji' },
        { id: '3', naziv: 'kozji' },
        { id: '4', naziv: 'miješano' }
    ];

    const MASNOCE = [
        { id: '1', naziv: 'niske' },
        { id: '2', naziv: 'srednje' },
        { id: '3', naziv: 'visoke' }
    ];

    const TIPOVI = [
        { id: '1', naziv: 'svježi' },
        { id: '2', naziv: 'polutvrdi' },
        { id: '3', naziv: 'tvrdi' },
        { id: '4', naziv: 'plavi' },
        { id: '5', naziv: 'ekstra tvrdi' }
    ];

    const ZRENJA = [
        { id: '1', naziv: 'mladi' },
        { id: '2', naziv: 'srednje zreli' },
        { id: '3', naziv: 'dugo zreli' }
    ];

    const INTENZITETI = [
        { id: '1', naziv: 'blagi' },
        { id: '2', naziv: 'srednji' },
        { id: '3', naziv: 'jaki' }
    ];

    function getVrstaNaziv(id) {
        return VRSTE.find(v => v.id === id)?.naziv || '';
    }

    function getMasnocaNaziv(id) {
        return MASNOCE.find(m => m.id === id)?.naziv || '';
    }

    function getTipNaziv(id) {
        return TIPOVI.find(t => t.id === id)?.naziv || '';
    }

    function getZrenjeNaziv(id) {
        return ZRENJA.find(z => z.id === id)?.naziv || '';
    }

    function getIntenzitetNaziv(id) {
        return INTENZITETI.find(i => i.id === id)?.naziv || '';
    }

    return (
        <Container className="py-3 px-0">
            <Row>
                {sirevi && sirevi.map((sir) => (
                    <Col key={sir.id} xs={12} md={6} className="mb-4">
                        <Card className="shadow-sm h-100">

                            <Card.Header className="bg-white py-3">
                                <span className="fw-bold text-primary">
                                    🧀 {sir.naziv}
                                </span>
                            </Card.Header>

                            <Card.Body>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Tip:</span>
                                    <span>{getTipNaziv(sir.tip_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Vrsta:</span>
                                    <span>{getVrstaNaziv(sir.vrsta_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Zrenje:</span>
                                    <span>{getZrenjeNaziv(sir.zrenje_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Regija:</span>
                                    <span>{sir.regija}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Intenzitet:</span>
                                    <span>{getIntenzitetNaziv(sir.intenzitet_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Masnoća:</span>
                                    <span>{getMasnocaNaziv(sir.masnoca_id)}</span>
                                </div>

                                <div className="mt-2">
                                    <span className="text-muted">Okus:</span>
                                    <div>{sir.okus}</div>
                                </div>

                            </Card.Body>

                            <Card.Footer className="bg-light d-flex justify-content-between">

                                {/* DESKTOP */}
                                <div className="d-none d-md-flex gap-2 w-100">

                                    <Button
                                        variant="outline-warning"
                                        className="flex-fill"
                                        onClick={() => navigate(`/sirevi/${sir.id}`)}
                                    >
                                        Promjena
                                    </Button>

                                    <Button
                                        variant="outline-danger"
                                        className="flex-fill"
                                        onClick={() => obrisi(sir.id)}
                                    >
                                        Obriši
                                    </Button>

                                    <Button
                                        variant="outline-info"
                                        className="flex-fill"
                                        onClick={() => navigate(`/uparivanje/sir/${sir.id}`, {
                                            state: { from: "sirevi" }
                                        })}
                                    >
                                        Uparivanje
                                    </Button>

                                </div>

                                {/* MOBILE */}
                                <div className="d-flex d-md-none justify-content-around px-3 w-100">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Promjena</Tooltip>}
                                    >
                                        <span>
                                            <FaEdit
                                                className="icon-btn text-warning"
                                                size={20}
                                                onClick={() => navigate(`/sirevi/${sir.id}`)}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Obriši</Tooltip>}
                                    >
                                        <span>
                                            <FaTrash
                                                className="icon-btn text-danger"
                                                size={20}
                                                onClick={() => obrisi(sir.id)}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Uparivanje</Tooltip>}
                                    >
                                        <span>
                                            <FaLink
                                                className="icon-btn text-info"
                                                size={20}
                                                onClick={() => navigate(`/uparivanje/sir/${sir.id}`, {
                                                    state: { from: "sirevi" }
                                                })}
                                            />
                                        </span>
                                    </OverlayTrigger>
                                </div>

                            </Card.Footer>

                        </Card>
                    </Col>
                ))}
            </Row>
            
            {/* SCROLL TO TOP BUTTON */}
            <button
                className="scroll-top-btn"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }
            >
                ⬆
            </button>

        </Container>
    );
}