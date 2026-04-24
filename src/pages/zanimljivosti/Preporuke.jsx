export default function Preporuke() {


    return (
        <div className="container mt-4">

            <h2 className="section-title mb-4 preporuke">Preporučene vinske sorte u RH</h2>

            <div className="row">

                {/* VRHUNSKA */}
                <div className="col-md-6">
                    <h4>Vrhunska</h4>

                    <h6 className="mt-3">Bijela vina</h6>
                    <ul className="white">
                        <li>BURGUNDAC BIJELI (PINOT BLANC)</li>
                        <li>BURGUNDAC SIVI (PINOT GRIS)</li>
                        <li>CHARDONNAY</li>
                        <li>RAJNSKI RIZLING</li>
                        <li>SAUVIGNON BIJELI (BLANC)</li>
                        <li>SILVANAC ZELENI (SILVANER)</li>
                        <li className="rose">TRAMINAC CRVENI (ROTER TRAMINER)</li>
                        <li>MUŠKAT OTTONEL</li>
                    </ul>

                    <h6 className="mt-3">Crvena vina</h6>
                    <ul className="red">
                        <li>BURGUNDAC CRNI (PINOT NOIR)</li>
                        <li>CABERNET SAUVIGNON</li>
                        <li>PLAVAC MALI</li>
                    </ul>
                </div>

                {/* KVALITETNA */}
                <div className="col-md-6">
                    <h4>Kvalitetna</h4>

                    <h6 className="mt-3">Bijela vina</h6>
                    <ul className="white">
                        <li>GRAŠEVINA BIJELA</li>
                        <li>MALVAZIJA BIJELA</li>
                        <li>RIZVANAC BIJELI (MULLER-THURGAU)</li>
                        <li>ŠKRLET BIJELI</li>
                        <li>MOSLAVAC BIJELI (ŠIPON, FURMINT)</li>
                    </ul>

                    <h6 className="mt-3">Crvena vina</h6>
                    <ul className="red">
                        <li>BABIĆ CRNI</li>
                        <li>FRANKOVKA</li>
                        <li>MERLOT CRNI</li>
                        <li>TERAN</li>
                        <li>PORTUGIZAC CRNI</li>
                    </ul>
                </div>

            </div>

        </div>
    );
}