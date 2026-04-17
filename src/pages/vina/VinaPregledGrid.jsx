import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaLink, FaTrash } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function VinaPregledGrid({ vina, navigate, obrisi }) {

    const TIPOVI_VINA = [
        { id: 1, naziv: "crveno" },
        { id: 2, naziv: "bijelo" },
        { id: 3, naziv: "pjenušavo" },
        { id: 4, naziv: "desertno" },
        { id: 5, naziv: "rose" }
    ];

    const SLATKOCE = [
        { id: 1, naziv: "suho" },
        { id: 2, naziv: "polusuho" },
        { id: 3, naziv: "poluslatko" },
        { id: 4, naziv: "slatko" }
    ];

    function getTipNaziv(id) {
        return TIPOVI_VINA.find(t => t.id === id)?.naziv || '';
    }

    function getSlatkocaNaziv(id) {
        return SLATKOCE.find(s => s.id === id)?.naziv || '';
    }

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }

    return (
        <Container className="py-3 px-0">
            <Row>
                {vina && vina.map((vino) => (
                    <Col key={vino.id} xs={12} md={6} className="mb-4">
                        <Card className="shadow-sm h-100">

                            <Card.Header className="bg-white py-3">
                                <span className="fw-bold text-primary">
                                    {vino.naziv}
                                </span>
                            </Card.Header>

                            <Card.Body>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Tip:</span>
                                    <span>{getTipNaziv(vino.tip_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Regija:</span>
                                    <span>{vino.regija}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Temperatura:</span>
                                    <span>
                                        {format1dec(vino.temperatura_min)} - {format1dec(vino.temperatura_max)} °C
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Slatkoća:</span>
                                    <span>{getSlatkocaNaziv(vino.slatkoca_id)}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Alkohol:</span>
                                    <span>
                                        {format1dec(vino.alkohol_min)} - {format1dec(vino.alkohol_max)} %
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <span className="text-muted">Arome:</span>
                                    <div>{vino.arome}</div>
                                </div>

                                <div className="mt-2">
                                    <span className="text-muted">Tijelo:</span>
                                    <div>{vino.tijelo}</div>
                                </div>

                            </Card.Body>

                            <Card.Footer className="bg-light">

                                {/* DESKTOP */}
                                <div className="d-none d-md-flex gap-2">

                                    <Button
                                        variant="outline-warning"
                                        className="flex-fill"
                                        onClick={() => navigate(`/vina/${vino.id}`)}
                                    >
                                        Promjena
                                    </Button>

                                    <Button
                                        variant="outline-danger"
                                        className="flex-fill"
                                        onClick={() => obrisi(vino.id)}
                                    >
                                        Obriši
                                    </Button>

                                    <Button
                                        variant="outline-info"
                                        className="flex-fill"
                                        onClick={() => navigate(`/uparivanje/vino/${vino.id}`, {
                                            state: { from: "vina" }
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
                                                onClick={() => navigate(`/vina/${vino.id}`)}
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
                                                onClick={() => obrisi(vino.id)}
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
                                                onClick={() => navigate(`/uparivanje/vino/${vino.id}`, {
                                                    state: { from: "vina" }
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
        </Container>
    );
}