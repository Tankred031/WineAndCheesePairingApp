import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import VinaService from "../../services/vina/VinaService"
import SireviService from "../../services/sirevi/SireviService"

import { Chart } from "react-google-charts"

export default function Statistika() {

    const [vina, setVina] = useState([])
    const [sirevi, setSirevi] = useState([])

    const redWine = "/statistika/red-wine-types.jpg"
    const whiteWine = "/statistika/white-wine.webp"
    const sparkWines = "/statistika/Spark-wine.jpg"
    const otherWine = "/statistika/port-blog.jpg"

    const freshCheese = "/statistika/fresh-cheese.jpg"
    const semiHard = "/statistika/semi-hard-cheese.jpg"
    const hardCheese = "/statistika/hard-cheese.jpg"
    const otherCheese = "/statistika/blue.webp"


    const TIPOVI_VINA = [
        { id: '1', naziv: "Crveno 🍷" },
        { id: '2', naziv: "Bijelo 🥂" },
        { id: '3', naziv: "Pjenušavo 🍾" },
        { id: '99', naziv: "Ostala 🍇" }
    ]

    const SLIKE_VINA = {
        '1': redWine,
        '2': whiteWine,
        '3': sparkWines,
        '99': otherWine
    }

    const TIPOVI_SIREVA = [
        { id: '1', naziv: "Svježi 🥛" },
        { id: '2', naziv: "Polutvrdi 🟨" },
        { id: '3', naziv: "Tvrdi 🧀" },
        { id: '99', naziv: "Ostali 🫕" }
    ]

    const SLIKE_SIREVA = {
        '1': freshCheese,
        '2': semiHard,
        '3': hardCheese,
        '99': otherCheese
    }

    const data = [

        [
            "Tip vina",
            "Suha",
            "Polusuha",
            "Poluslatka",
            "Slatka"
        ],

        ...[
            { naziv: "Crveno", tipovi: ["1"] },
            { naziv: "Bijelo", tipovi: ["2"] },
            { naziv: "Pjenušava i ostala", tipovi: ["3", "4", "5"] },
        ].map(grupa => {

            const suha = vina.filter(v =>
                grupa.tipovi.includes(String(v.tip_id)) &&
                String(v.slatkoca_id) === '1'
            ).length;

            const polusuha = vina.filter(v =>
                grupa.tipovi.includes(String(v.tip_id)) &&
                String(v.slatkoca_id) === '2'
            ).length;

            const poluslatka = vina.filter(v =>
                grupa.tipovi.includes(String(v.tip_id)) &&
                String(v.slatkoca_id) === '3'
            ).length;

            const slatka = vina.filter(v =>
                grupa.tipovi.includes(String(v.tip_id)) &&
                String(v.slatkoca_id) === '4'
            ).length;

            return [
                grupa.naziv,
                suha,
                polusuha,
                poluslatka,
                slatka
            ]
        })

    ]

    const options = {

        title: "Pregled vina po tipu i slatkoći",

        titleTextStyle: {
            fontSize: 22,
            bold: true,
        },

        titlePosition: "out",

        chartArea: {
            width: "55%",
        },

        isStacked: true,

        colors: [
            "#7b0323",
            "#990012",
            "#d66a7a",
            "#D8A7B1"
        ],

        hAxis: {
            title: "Broj vina",
            minValue: 0,
        },

        vAxis: {
            title: "Tip vina",

            titleTextStyle: {
                bold: true
            }
        },

        backgroundColor: "silver",

        legend: {
            position: "right",
        },
    };

    const cheeseData = [

        ["Tip sira", "Broj sireva"],

        ["Svježi", 12],
        ["Polutvrdi", 18],
        ["Tvrdi", 9],
        ["Plavi / Ostali", 5],
    ];

    const cheeseOptions = {

        title: "Sirevi po svježini i tipu",

        backgroundColor: "silver",

        pieHole: 0.2,

        colors: [
            "#fffdf5", // gotovo bijela
            "#0b0b0a", // svijetlo žuta
            "#e8c65d", // zlatna
            "#9ecbff"  // svijetlo plava
        ],

        titleTextStyle: {
            fontSize: 22,
            bold: true,
        },

        legend: {
            position: "right",
            textStyle: {
                fontSize: 14,
            },
        },

        chartArea: {
            width: "85%",
            height: "75%",
            top: 90,
        },


        pieSliceTextStyle: {
            color: "black",
            fontSize: 14,
        },
    };

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

        if (tipId === '99') {
            return vina.filter(v =>
                !['1', '2', '3'].includes(String(v.tip_id))
            ).length
        }

        return vina.filter(v =>
            String(v.tip_id) === String(tipId)
        ).length
    }

    function brojSirevaPoTipu(tipId) {

        if (tipId === '99') {
            return sirevi.filter(s =>
                !['1', '2', '3'].includes(String(s.tip_id))
            ).length
        }

        return sirevi.filter(s =>
            String(s.tip_id) === String(tipId)
        ).length
    }

    return (
        <div className="mt-4">

            <h2 className="section-title mb-4">Statistika vina</h2>

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

            <div className="my-5">

                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="500px"
                    data={data}
                    options={options}
                />

            </div>

            <h2 className="section-title mb-4">Statistika sireva</h2>

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

            <Chart
                chartType="PieChart"
                width="100%"
                height="450px"
                data={cheeseData}
                options={cheeseOptions}
            />

            
        </div>
    )
}