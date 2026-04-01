import Card from "../components/Kartice";
import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import vinoDan from "../assets/wine-day.png"
import drinks from "../assets/drinks.jpg"
import cheeseMeat from "../assets/cheese-meat.webp"

export default function Home() {
    return (
        <>
            <h1 className="h1">Dobrodošli na {IME_APLIKACIJE}</h1>

            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <DotLottieReact
                    src="/bottle.lottie"

                    loop
                    autoplay

                />
            </div>

            <div className="container mt-4">
                <div className="row">

                    <div className="col mt-4">
                        <Card
                            img={vinoDan}
                            alt="vino"
                            title="Nacionalni dan vina i sira 🍷🧀"
                            text="Jeste li znali da vino i sir imaju svoj dan? Imaju, i to na 25. srpnja. Pa stoga evo par prijedloga u ovoj aplikaciji, kako spojiti što s čim, a o danu vina, više na linku"
                            link="https://www.foxnews.com/lifestyle/national-wine-cheese-day-best-wine-cheese-pairings"
                            button="Pročitaj više"
                        />
                    </div>
                    <div className="col mt-4">
                        <Card
                            img={drinks}
                            alt="vino"
                            title="Vino u usporedbi s drugim pićima 🍷👉 🍺🍸🍹"
                            text="Vino ne samo da nije štetno, već je i izuzetno zdravo, razumije se u razumnim količinama. Gdje stoji vino u odnosu na ostale užitke pročitajte više klikom na gumb"
                            link="https://share.google/t4flBoU7RRmxGP7wN"
                            button="Pročitaj više"
                        />
                    </div>
                    <div className="col mt-4">
                        <Card
                            img={cheeseMeat}
                            alt="vino"
                            title="Sir (i druge stvari) - 👌 za vaše ❤️"
                            text="A da ne ispadne da je samo vino zdravo, evo članka i o njegovom najboljem prijatelju. Ta̋, nisu Francuzi bili blesavi kad su otkrili tu simbiozu stoljećima ranije"
                            link="https://foxnews.com/video/5828268578001"
                            button="Pročitaj više"
                        />
                    </div>

                </div>
            </div>
        </>
    );
}