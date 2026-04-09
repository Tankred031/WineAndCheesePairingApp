import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import SireviService from "../../services/sirevi/SireviService";
import { useEffect, useState } from "react";


export default function SireviPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [sir, setSir] = useState({})


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
            vrsta: podaci.get('vrsta'),
            zrenje: podaci.get('zrenje'),
            regija: podaci.get('regija'),
            intezitet: podaci.get('intezitet'),
            masnoce: podaci.get('masnoce'),
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
                            <Form.Select name="vrsta" required>
                                <option value="kravlji">kravlji</option>
                                <option value="ovčji">ovčji</option>
                                <option value="kozji">kozji</option>
                                <option value="mješoviti">mješoviti</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="masnoce" className="form-group-custom">
                            <Form.Label className="form-label-custom">Masnoce</Form.Label>
                            <Form.Select name="masnoce" required>
                                <option value="visoke">visoke</option>
                                <option value="srednje">srednje</option>
                                <option value="niske">niske</option>
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

