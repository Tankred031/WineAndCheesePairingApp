import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import SireviService from "../../services/sirevi/SireviService"
import { Link, useNavigate } from "react-router-dom"


export default function SireviNovi() {

    const navigate = useNavigate()

    async function dodaj(sir) {
        await SireviService.dodaj(sir).then(() => {
            navigate(RouteNames.SIREVI_PREGLED)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return // Prekid
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv smjera mora imati najmanje 3 znaka!")
            return // Prekid
        }


        dodaj({
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
            <h3>
                Unos novog sira
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv" className="form-group-custom">
                    <Form.Label className="form-label-custom">Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="tip" className="form-group-custom">
                    <Form.Label className="form-label-custom">Tip</Form.Label>
                    <Form.Control type="text" name="tip" required />
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
                    <Form.Control type="text" name="zrenje" required />
                </Form.Group>

                <Form.Group controlId="regija" className="form-group-custom">
                    <Form.Label className="form-label-custom">Regija</Form.Label>
                    <Form.Control type="text" name="regija" required />
                </Form.Group>

                <Form.Group controlId="intezitet" className="form-group-custom">
                    <Form.Label className="form-label-custom">Intezitet</Form.Label>
                    <Form.Control type="text" name="intezitet" required />
                </Form.Group>


                <Form.Group controlId="okus" className="form-group-custom">
                    <Form.Label className="form-label-custom">Okus</Form.Label>
                    <Form.Control type="text" name="okus" required />
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
                            Dodaj novi sir
                        </Button>
                    </Col>
                </Row>

            </Form>

        </>
    )
}

