import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import VinaService from "../../services/vina/VinaService"
import SireviService from "../../services/sirevi/SireviService"

import redWine from "../../assets/statistika/red-wine-types.jpg"
import whiteWine from "../../assets/statistika/white-wine.webp"
import sparkWines from "../../assets/statistika/Spark-wine.jpg"   
import otherWine from "../../assets/statistika/port-blog.jpg"

import freshCheese from "../../assets/statistika/fresh-cheese.jpg"
import semiHard from "../../assets/statistika/semi-hard-cheese.jpg"
import hardCheese from "../../assets/statistika/hard-cheese.jpg"
import otherCheese from "../../assets/statistika/blue.webp"

export default function Statistika() {

    const [vina, setVina] = useState([])
    const [sirevi, setSirevi] = useState([])
    

    const TIPOVI_VINA = [
        { id: 1, naziv: "Crveno 🍷" },
        { id: 2, naziv: "Bijelo 🥂" },
        { id: 3, naziv: "Pjenušavo 🍾" },
        { id: 99, naziv: "Ostala 🍇" }
    ]

    const SLIKE_VINA = {
        1: redWine,
        2: whiteWine,
        3: sparkWines,
        99: otherWine
    }

    const TIPOVI_SIREVA = [
        { id: 1, naziv: "Svježi 🥛" },
        { id: 2, naziv: "Polutvrdi 🟨" },
        { id: 3, naziv: "Tvrdi 🧀" },
        { id: 99, naziv: "Ostali 🫕" }
    ]

    const SLIKE_SIREVA = {
        1: freshCheese,
        2: semiHard,
        3: hardCheese,
        99: otherCheese
    }
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
                                src={SLIKE_VINA[tip.id]}
                                alt={tip.naziv}
                                className="stat-img"
                            />

                            <Card.Body className={`vino-${tip.id}`}>
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
                                src={SLIKE_SIREVA[tip.id]}
                                alt={tip.naziv}
                                className="stat-img"
                            />

                            <Card.Body className={`sir-${tip.id}`}>
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