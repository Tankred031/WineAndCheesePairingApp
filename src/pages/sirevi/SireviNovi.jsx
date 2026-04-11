import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import SireviService from "../../services/sirevi/SireviService"
import { Link, useNavigate } from "react-router-dom"


export default function SireviNovi() {

    const navigate = useNavigate()

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
            alert("Naziv sira mora imati najmanje 3 znaka!")
            return // Prekid
        }


        dodaj({
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
                            <Form.Select name="vrsta_id" required>
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
                            <Form.Select name="masnoca_id" required>
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

