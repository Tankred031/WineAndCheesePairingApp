import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import SireviService from "../../services/sirevi/SireviService";

export default function SireviNovi() {

    const navigate = useNavigate();

    const VRSTE = [
        { id: 1, naziv: "kravlji" }, { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" }, { id: 4, naziv: "miješano" }
    ];

    const MASNOCE = [
        { id: 1, naziv: "niske" }, { id: 2, naziv: "srednje" }, { id: 3, naziv: "visoke" }
    ];

    const TIPOVI = [
        { id: 1, naziv: "svježi" }, { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" }, { id: 4, naziv: "plavi" }, { id: 5, naziv: "ekstra tvrdi" }
    ];

    const ZRENJA = [
        { id: 1, naziv: "mladi" }, { id: 2, naziv: "srednje zreli" }, { id: 3, naziv: "dugo zreli" }
    ];

    const INTEZITETI = [
        { id: 1, naziv: "blagi" }, { id: 2, naziv: "srednji" }, { id: 3, naziv: "jaki" }
    ];

    async function dodaj(sir) {
        await SireviService.dodaj(sir);
        navigate(RouteNames.SIREVI_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        if (!podaci.get('naziv') || podaci.get('naziv').trim().length < 2) {
            alert("Naziv mora imati barem 2 znaka");
            return;
        }

        dodaj({
            naziv: podaci.get('naziv'),
            vrsta_id: Number(podaci.get('vrsta_id')),
            tip_id: Number(podaci.get('tip_id')),
            zrenje_id: Number(podaci.get('zrenje_id')),
            masnoca_id: Number(podaci.get('masnoca_id')),
            intezitet_id: Number(podaci.get('intezitet_id')),
            regija: podaci.get('regija'),
            okus: podaci.get('okus')
        });
    }

    return (
        <>
            <h3 className="naslov">Unos novog sira</h3>

            <Form onSubmit={odradiSubmit}>

                {/* RED 1 */}
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control name="naziv" placeholder="npr. Gouda" required />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Vrsta</Form.Label>
                            <Form.Select name="vrsta_id">
                                {VRSTE.map(v => (
                                    <option key={v.id} value={v.id}>{v.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Tip</Form.Label>
                            <Form.Select name="tip_id">
                                {TIPOVI.map(t => (
                                    <option key={t.id} value={t.id}>{t.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* RED 2 */}
                <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Zrenje</Form.Label>
                            <Form.Select name="zrenje_id">
                                {ZRENJA.map(z => (
                                    <option key={z.id} value={z.id}>{z.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Masnoća</Form.Label>
                            <Form.Select name="masnoca_id">
                                {MASNOCE.map(m => (
                                    <option key={m.id} value={m.id}>{m.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Intenzitet</Form.Label>
                            <Form.Select name="intezitet_id">
                                {INTEZITETI.map(i => (
                                    <option key={i.id} value={i.id}>{i.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Regija</Form.Label>
                            <Form.Control name="regija" placeholder="npr. Francuska" required />
                        </Form.Group>
                    </Col>
                </Row>

                {/* RED 3 */}
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Okus</Form.Label>
                            <Form.Control name="okus" placeholder="npr. orašast, pikantan..." required />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="mt-3" />

                {/* BUTTONI */}
                <Row>
                    <Col>
                        <Link to={RouteNames.SIREVI_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" className="w-100" variant="success">
                            Dodaj sir
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}