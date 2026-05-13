import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import SireviService from "../../services/sirevi/SireviService";
import { useState } from "react";
import { ShemaSir } from "../../schemas/ShemaSir";

export default function SireviNovi() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

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

    async function dodaj(sir) {
        await SireviService.dodaj(sir);
        navigate(RouteNames.SIREVI_PREGLED);
    }

    async function odradiSubmit(e) {
        e.preventDefault();
        setErrors({});

        const podaci = new FormData(e.target);

        const objekt = {
            naziv: podaci.get('naziv'),
            vrsta_id: podaci.get('vrsta_id'),
            tip_id: podaci.get('tip_id'),
            zrenje_id: podaci.get('zrenje_id'),
            masnoca_id: podaci.get('masnoca_id'),
            intenzitet_id: podaci.get('intenzitet_id'),
            regija: podaci.get('regija'),
            okus: podaci.get('okus')
        };

        const rezultat = ShemaSir.safeParse(objekt);

        if (!rezultat.success) {
            const noveGreske = {};

            rezultat.error.issues.forEach(issue => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        dodaj(objekt);
    }

    const ocistiGresku = (polje) => {
        if (errors[polje]) {
            const e = { ...errors };
            delete e[polje];
            setErrors(e);
        }
    };

    return (
        <>
            <h3 className="naslov">Unos novog sira</h3>

            <Form onSubmit={odradiSubmit}>

                {/* RED 1 */}
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                name="naziv"
                                isInvalid={!!errors.naziv}
                                onFocus={() => ocistiGresku("naziv")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.naziv}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Vrsta</Form.Label>
                            <Form.Select
                                name="vrsta_id"
                                isInvalid={!!errors.vrsta_id}
                            >
                                <option value="">-- odaberite vrstu --</option>
                                {VRSTE.map(v => (
                                    <option key={v.id} value={v.id}>{v.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.vrsta_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Tip</Form.Label>
                            <Form.Select
                                name="tip_id"
                                isInvalid={!!errors.tip_id}
                            >
                                <option value="">-- odaberite tip --</option>
                                {TIPOVI.map(t => (
                                    <option key={t.id} value={t.id}>{t.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.tip_id}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.zrenje_id}
                            >
                                <option value="">-- odaberite zrenje --</option>
                                {ZRENJA.map(z => (
                                    <option key={z.id} value={z.id}>{z.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.zrenje_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Masnoća</Form.Label>
                            <Form.Select
                                name="masnoca_id"
                                isInvalid={!!errors.masnoca_id}
                            >
                                <option value="">-- odaberite masnoću --</option>
                                {MASNOCE.map(m => (
                                    <option key={m.id} value={m.id}>{m.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.masnoca_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Intenzitet</Form.Label>
                            <Form.Select
                                name="intenzitet_id"
                                isInvalid={!!errors.intenzitet_id}
                            >
                                <option value="">-- odaberite intenzitet --</option>
                                {INTENZITETI.map(i => (
                                    <option key={i.id} value={i.id}>{i.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.intenzitet_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Regija</Form.Label>
                            <Form.Control
                                name="regija"
                                isInvalid={!!errors.regija}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.regija}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.okus}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.okus}
                            </Form.Control.Feedback>
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
                            Dodaj sir
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}