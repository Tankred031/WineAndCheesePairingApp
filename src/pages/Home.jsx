import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function Home() {
    return (
        <>
            <div style={{ textAlign: "center", marginTop: "80px" }}>
                <img src="/Wine&Cheese.png" alt="Wine & Cheese" className="home-logo" />
                <h1 className="h1">Dobrodošli na {IME_APLIKACIJE}</h1>
                <p style={{ fontSize: "18px", color: "#7B0323" }}>Pronađite savršenu kombinaciju vina i sira</p>
            </div>

            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <DotLottieReact
                    src="/bottle.lottie"

                    loop
                    autoplay

                />
            </div>

            
        </>
    );
}