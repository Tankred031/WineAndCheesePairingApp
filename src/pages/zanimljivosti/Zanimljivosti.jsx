import Card from "../../components/Kartice"
import vinoDan from "../../assets/wine-day.png"
import drinks from "../../assets/drinks.jpg"
import cheeseMeat from "../../assets/cheese-meat.webp"
import { useEffect, useState } from "react"
import { getCards } from '../../services/zanimljivosti/ZanimljivostiService'


export default function Zanimljivosti() {

    const [cards, setCards] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setCards(getCards())
    }, [reload])

    return (
        <>
            <h2 className="section-title mt-4">Članci</h2>

            <div className="container mt-4">
                <div className="row justify-content-center">

                    <div className="col-md-4 mt-4">
                        <Card
                            img={vinoDan}
                            alt="vino-sir"
                            title="Nacionalni dan vina i sira 🍷🧀"
                            text="Jeste li znali da vino i sir imaju svoj dan? Imaju, i to na 25. srpnja. Pa stoga evo par prijedloga u ovoj aplikaciji, kako spojiti što s čim, a o danu vina, više na linku"
                            link="https://www.foxnews.com/lifestyle/national-wine-cheese-day-best-wine-cheese-pairings"
                            button="Pročitaj više"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <Card
                            img={drinks}
                            alt="vino-alkohol"
                            title="Vino u usporedbi s drugim pićima  🍺🍸🍹"
                            text="Vino ne samo da nije štetno, već je i izuzetno zdravo, razumije se u razumnim količinama. Gdje stoji vino u odnosu na ostale užitke pročitajte više klikom na gumb"
                            link="https://share.google/t4flBoU7RRmxGP7wN"
                            button="Pročitaj više"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <Card
                            img={cheeseMeat}
                            alt="vino-meso"
                            title="Sir (i druge stvari) - 👌 za vaše ❤️"
                            text="A da ne ispadne da je samo vino zdravo, evo članka i o njegovom najboljem prijatelju. Ta̋, nisu Francuzi bili blesavi kad su otkrili tu simbiozu stoljećima ranije"
                            link="https://foxnews.com/video/5828268578001"
                            button="Pročitaj više"
                        />
                    </div>

                    {cards.map((card, index) => (
                        <div className="col-md-4 mt-4" key={index}>
                            <Card {...card} button="Pročitaj više" />
                        </div>
                    ))}

                </div>
            </div>

        </>
    )
}