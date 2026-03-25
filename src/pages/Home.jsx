import { IME_APLIKACIJE } from "../constants";
import wines from "../assets/wines.png";

export default function Home(){
    return(
       <>
       <h1>Dobrodošli na {IME_APLIKACIJE}</h1>
       <div>
        <img src={wines} alt="Wines" style={{ width: "100%" }} />
       </div>
       </> 
    )
}