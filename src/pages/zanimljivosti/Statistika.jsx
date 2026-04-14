import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import VinaService from "../../services/vina/VinaService"
import SireviService from "../../services/sirevi/SireviService"

export default function Statistika() {

    const [vina, setVina] = useState([])
    const [sirevi, setSirevi] = useState([])

    const TIPOVI_VINA = [
        { id: 1, naziv: "Crveno 🍷" },
        { id: 2, naziv: "Bijelo 🥂" },
        { id: 3, naziv: "Pjenušavo 🍾" },
        { id: 99, naziv: "Ostala 🍇" }
    ]

    const TIPOVI_SIREVA = [
        { id: 1, naziv: "Svježi 🧀" },
        { id: 2, naziv: "Polutvrdi 🟡" },
        { id: 3, naziv: "Tvrdi 🟠" },
        { id: 99, naziv: "Ostali 🧩" }
    ]

    useEffect(() => {
        ucitaj()
    }, [])

    async function ucitaj() {
        const v = await VinaService.get()
        const s = await SireviService.get()

        setVina(v.data || [])
        setSirevi(s.data || [])
    }

    function brojVinaPoTipu(tipId) {

        if (tipId === 99) {
            return vina.filter(v =>
                ![1, 2, 3].includes(v.tip_id)
            ).length
        }

        return vina.filter(v => v.tip_id === tipId).length
    }

    function brojSirevaPoTipu(tipId) {

        if (tipId === 99) {
            return sirevi.filter(s =>
                ![1, 2, 3].includes(s.tip_id)
            ).length
        }

        return sirevi.filter(s => s.tip_id === tipId).length
    }

    return (
        <div className="mt-4">

            <h3 className="text-center mb-4">🍷 Statistika vina</h3>

            <Row className="mb-5">
                {TIPOVI_VINA.map(tip => (
                    <Col md={3} key={tip.id} className="mb-3">
                        <Card className="stat-card text-center h-100">

                            <img
                                src="https://placehold.co/600x400"
                                alt="placeholder"
                                className="stat-img"
                            />

                            <Card.Body>
                                <h5>{tip.naziv}</h5>
                                <div className="stat-number">
                                    {brojVinaPoTipu(tip.id)}
                                </div>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>

            <h3 className="text-center mb-4">🧀 Statistika sireva</h3>

            <Row>
                {TIPOVI_SIREVA.map(tip => (
                    <Col md={3} key={tip.id} className="mb-3">
                        <Card className="stat-card text-center h-100">

                            <img
                                src="https://placehold.co/600x400"
                                alt="sir"
                                className="stat-img"
                            />

                            <Card.Body>
                                <h5>{tip.naziv}</h5>
                                <div className="stat-number">
                                    {brojSirevaPoTipu(tip.id)}
                                </div>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}