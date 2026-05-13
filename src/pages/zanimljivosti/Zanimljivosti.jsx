import { useEffect, useState } from "react"
import ZanimljivostiService from '../../services/zanimljivosti/ZanimljivostiService'
import { useNavigate } from "react-router-dom"
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"

export default function Zanimljivosti() {

    const [cards, setCards] = useState([])
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            const res = await ZanimljivostiService.get();
            setCards(res.data);
        };

        load()
    }, [reload]);

    async function obrisi(id, isStatic) {
        if (!window.confirm("Sigurno želiš obrisati?")) return

        if (isStatic) {
            alert("Ovaj članak je statički i ne može se obrisati.")
            return
        }

        await ZanimljivostiService.obrisi(id)
        setReload(!reload)
    }

    return (
        <>
            <h2 className="section-title mt-4">Članci</h2>

            <div className="container mt-4">
                <div className="row justify-content-center">

                    {/* postojeće kartice */}
                    <div className="col-md-4 mt-4">
                        <Card
                            id="static-1"
                            staticCard={true}
                            img="/wine-day.png"
                            alt="vino-sir"
                            title="Nacionalni dan vina i sira 🍷🧀"
                            text="Jeste li znali da vino i sir imaju svoj dan? Imaju, i to na 25. srpnja..."
                            link="https://www.foxnews.com/lifestyle/national-wine-cheese-day-best-wine-cheese-pairings"
                            button="Pročitaj više"

                            extraButtons={
                                <div className="d-flex justify-content-end gap-3 mt-2">

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Uredi (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaEdit
                                                className="icon-btn text-warning"
                                                size={20}
                                                onClick={() => alert("Ovaj članak se ne može uređivati")}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Obriši (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaTrash
                                                className="icon-btn text-danger"
                                                size={20}
                                                onClick={() => obrisi("static-1", true)}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                </div>
                            }
                        />
                    </div>

                    <div className="col-md-4 mt-4">
                        <Card
                            id="static-2"
                            staticCard={true}
                            img="/drinks.jpg"
                            alt="vino-alkohol"
                            title="Vino u usporedbi s drugim pićima 🍺🍸🍹"
                            text="Vino ne samo da nije štetno..."
                            link="https://share.google/t4flBoU7RRmxGP7wN"
                            button="Pročitaj više"

                            extraButtons={
                                <div className="d-flex justify-content-end gap-3 mt-2">

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Uredi (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaEdit
                                                className="icon-btn text-warning"
                                                size={20}
                                                onClick={() => alert("Ovaj članak se ne može uređivati")}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Obriši (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaTrash
                                                className="icon-btn text-danger"
                                                size={20}
                                                onClick={() => obrisi("static-2", true)}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                </div>
                            }
                        />
                    </div>

                    <div className="col-md-4 mt-4">
                        <Card
                            id="static-3"
                            staticCard={true}
                            img="/cheese.meat.webp"
                            alt="vino-meso"
                            title="Sir (i druge stvari) - 👌 za vaše ❤️"
                            text="A da ne ispadne da je samo vino zdravo..."
                            link="https://foxnews.com/video/5828268578001"
                            button="Pročitaj više"

                            extraButtons={
                                <div className="d-flex justify-content-end gap-3 mt-2">

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Uredi (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaEdit
                                                className="icon-btn text-warning"
                                                size={20}
                                                onClick={() => alert("Ovaj članak se ne može uređivati")}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Obriši (nije moguće)</Tooltip>}>
                                        <span>
                                            <FaTrash
                                                className="icon-btn text-danger"
                                                size={20}
                                                onClick={() => obrisi("static-3", true)}
                                            />
                                        </span>
                                    </OverlayTrigger>

                                </div>
                            }
                        />
                    </div>

                    {/* NOVO DODANE */}
                    {cards.length > 0 && (
                        <div className="row justify-content-center zanimljivosti-nove">

                            {cards.map((card) => (
                                <div className="col-md-4 mt-4" key={card.id}>
                                    <Card
                                        {...card}
                                        button="Pročitaj više"

                                        extraButtons={
                                            <div className="d-flex justify-content-end gap-3 mt-2">

                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Uredi</Tooltip>}
                                                >
                                                    <span>
                                                        <FaEdit
                                                            className="icon-btn text-warning"
                                                            size={20}
                                                            onClick={() => navigate(`/zanimljivosti/${card.id}`)}
                                                        />
                                                    </span>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Obriši</Tooltip>}
                                                >
                                                    <span>
                                                        <FaTrash
                                                            className="icon-btn text-danger"
                                                            size={20}
                                                            onClick={() => obrisi(card.id)}
                                                        />
                                                    </span>
                                                </OverlayTrigger>

                                            </div>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}