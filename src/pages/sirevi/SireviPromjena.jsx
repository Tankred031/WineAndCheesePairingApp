import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import SireviService from "../../services/sirevi/SireviService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";

export default function SireviPromjena() {

    const navigate = useNavigate();
    const params = useParams();
    const [sir, setSir] = useState({});

    const { showLoading, hideLoading } = useLoading()

    const VRSTE = [
        { id: 1, naziv: "kravlji" },
        { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" },
        { id: 4, naziv: "miješano" }
    ];

    const MASNOCE = [
        { id: 1, naziv: "niske" },
        { id: 2, naziv: "srednje" },
        { id: 3, naziv: "visoke" }
    ];

    const TIPOVI = [
        { id: 1, naziv: "svježi" },
        { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" },
        { id: 4, naziv: "plavi" },
        { id: 5, naziv: "ekstra tvrdi" }
    ];

    const ZRENJA = [
        { id: 1, naziv: "mladi" },
        { id: 2, naziv: "srednje zreli" },
        { id: 3, naziv: "dugo zreli" }
    ];

    const INTEZITETI = [
        { id: 1, naziv: "blagi" },
        { id: 2, naziv: "srednji" },
        { id: 3, naziv: "jaki" }
    ];

    useEffect(() => {
        ucitajSir();
    }, []);

    async function ucitajSir() {
        showLoading("Učitavam sireve...");

        const odgovor = await SireviService.getById(params.id);

        if (!odgovor.success) {
            alert("Greška kod učitavanja");
            return;
        }

        setSir(odgovor.data);
        hideLoading();
    }

    async function promjeni(sir) {
        showLoading("Spremam izmjene...");

        await SireviService.promjeni(params.id, sir);

        setTimeout(() => {
            hideLoading();
            navigate(RouteNames.SIREVI_PREGLED);
        }, 400);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        if (!podaci.get('naziv') || podaci.get('naziv').trim().length < 2) {
            alert("Naziv mora imati barem 2 znaka");
            return;
        }

        promjeni({
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
            <h3 className="naslov">Izmjena sira</h3>

            <Form onSubmit={odradiSubmit}>

                {/* RED 1 */}
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                name="naziv"
                                defaultValue={sir.naziv}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Vrsta</Form.Label>
                            <Form.Select
                                name="vrsta_id"
                                value={sir.vrsta_id || ""}
                                onChange={(e) => setSir({ ...sir, vrsta_id: Number(e.target.value) })}
                            >
                                {VRSTE.map(v => (
                                    <option key={v.id} value={v.id}>{v.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Tip</Form.Label>
                            <Form.Select
                                name="tip_id"
                                value={sir.tip_id || ""}
                                onChange={(e) => setSir({ ...sir, tip_id: Number(e.target.value) })}
                            >
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
                            <Form.Select
                                name="zrenje_id"
                                value={sir.zrenje_id || ""}
                                onChange={(e) => setSir({ ...sir, zrenje_id: Number(e.target.value) })}
                            >
                                {ZRENJA.map(z => (
                                    <option key={z.id} value={z.id}>{z.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Masnoća</Form.Label>
                            <Form.Select
                                name="masnoca_id"
                                value={sir.masnoca_id || ""}
                                onChange={(e) => setSir({ ...sir, masnoca_id: Number(e.target.value) })}
                            >
                                {MASNOCE.map(m => (
                                    <option key={m.id} value={m.id}>{m.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Intenzitet</Form.Label>
                            <Form.Select
                                name="intezitet_id"
                                value={sir.intezitet_id || ""}
                                onChange={(e) => setSir({ ...sir, intezitet_id: Number(e.target.value) })}
                            >
                                {INTEZITETI.map(i => (
                                    <option key={i.id} value={i.id}>{i.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Regija</Form.Label>
                            <Form.Control
                                name="regija"
                                defaultValue={sir.regija}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* RED 3 */}
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Okus</Form.Label>
                            <Form.Control
                                name="okus"
                                defaultValue={sir.okus}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="mt-3" />

                <Row>
                    <Col>
                        <Link to={RouteNames.SIREVI_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" className="w-100" variant="success">
                            Spremi promjene
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}