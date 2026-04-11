import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import SireviService from "../../services/sirevi/SireviService";
import { useEffect, useState } from "react";


export default function SireviPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [sir, setSir] = useState({})

    const VRSTE = [
        { id: 1, naziv: "kravlji" },
        { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" },
        { id: 4, naziv: "miješano" }
    ]

    const MASNOCE = [
        { id: 1, naziv: "niske" },
        { id: 2, naziv: "srednje" },
        { id: 3, naziv: "visoke" }
    ]


    async function ucitajSir() {
        await SireviService.getById(params.id).then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            const s = odgovor.data
            setSir(s)
        })

    }


    useEffect(() => {
        ucitajSir()
    }, [])


    async function promjeni(sir) {
        await SireviService.promjeni(params.id, sir).then(() => {
            navigate(RouteNames.SIREVI_PREGLED)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            tip: podaci.get('tip'),
            vrsta_id: Number(podaci.get('vrsta_id')),
            zrenje: podaci.get('zrenje'),
            regija: podaci.get('regija'),
            intezitet: podaci.get('intezitet'),
            masnoca_id: Number(podaci.get('masnoca_id')),
            okus: podaci.get('okus')
        })

    }

    return (
        <>
            <h3 className="naslov">
                Izmjena postojećeg sira
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv" className="form-group-custom">
                    <Form.Label className="form-label-custom">Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={sir.naziv} />
                </Form.Group>

                <Form.Group controlId="tip" className="form-group-custom">
                    <Form.Label className="form-label-custom">Tip</Form.Label>
                    <Form.Control type="text" name="tip" required
                        defaultValue={sir.tip} />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="vrsta" className="form-group-custom">
                            <Form.Label className="form-label-custom">Vrsta</Form.Label>
                            <Form.Select
                                name="vrsta_id"
                                required
                                value={sir.vrsta_id || ""}
                                onChange={(e) => setSir({ ...sir, vrsta_id: Number(e.target.value) })}
                            >
                                {VRSTE.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.naziv}
                                    </option>
                                ))}
                            </Form.Select>

                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="masnoce" className="form-group-custom">
                            <Form.Label className="form-label-custom">Masnoće</Form.Label>
                            <Form.Select
                                name="masnoca_id"
                                required
                                value={sir.masnoca_id || ""}
                                onChange={(e) => setSir({ ...sir, masnoca_id: Number(e.target.value) })}
                            >
                                {MASNOCE.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.naziv}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="zrenje" className="form-group-custom">
                    <Form.Label className="form-label-custom">Zrenje</Form.Label>
                    <Form.Control type="text" name="zrenje" required
                        defaultValue={sir.zrenje} />
                </Form.Group>

                <Form.Group controlId="regija" className="form-group-custom">
                    <Form.Label className="form-label-custom">Regija</Form.Label>
                    <Form.Control type="text" name="regija" required
                        defaultValue={sir.regija} />
                </Form.Group>

                <Form.Group controlId="intezitet" className="form-group-custom">
                    <Form.Label className="form-label-custom">Intezitet</Form.Label>
                    <Form.Control type="text" name="intezitet" required
                        defaultValue={sir.intezitet} />
                </Form.Group>

                <Form.Group controlId="okus" className="form-group-custom">
                    <Form.Label className="form-label-custom">Okus</Form.Label>
                    <Form.Control type="text" name="okus" required
                        defaultValue={sir.okus} />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.SIREVI_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Promjeni sir
                        </Button>
                    </Col>
                </Row>

            </Form>

        </>
    )
}

