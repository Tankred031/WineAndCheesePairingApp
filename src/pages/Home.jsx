import { IME_APLIKACIJE } from "../constants";
import wines from "../assets/wines.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home(){
    return(
       <>
       <h1 className="h1">Dobrodošli na {IME_APLIKACIJE}</h1>
       <div>
        <img src={wines} alt="Wines" style={{ width: "100%" }} />
       </div>
       <div style={{maxWidth: '300px', margin: 'auto'}}>
                <DotLottieReact
                src="/bottle.lottie"

                loop
                autoplay

                />
        </div>
       </> 
    )
}