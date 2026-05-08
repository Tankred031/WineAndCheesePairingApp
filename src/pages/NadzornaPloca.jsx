import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/edunova.svg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
//import SmjerService from "../services/smjerovi/SmjerService";
//import PolaznikService from "../services/polaznici/PolaznikService";
//import GrupaService from "../services/grupe/GrupaService";
import OperaterService from "../services/operateri/OperaterService";
import useLoading from "../hooks/useLoading"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import SunburstModule from 'highcharts/modules/sunburst';

export default function NadzornaPloca() {        

    // inicijalizacija sunburst modula
    SunburstModule(Highcharts);

    // PODACI
    const data = [
        {
            id: '0.0',
            parent: '',
            name: 'Sva vina'
        },

        {
            id: '1.1',
            parent: '0.0',
            name: 'Crvena vina'
        },
        {
            id: '1.2',
            parent: '0.0',
            name: 'Bijela vina'
        },

        {
            id: '2.1',
            parent: '1.1',
            name: 'Slatkoća'
        },

        {
            id: '3.1',
            parent: '2.1',
            name: 'Suho',
            value: 30
        },
        {
            id: '3.2',
            parent: '2.1',
            name: 'Polusuho',
            value: 2
        }
    ];

    export default function NadzornaPloca() {

        const options = {

            chart: {
                height: '700px'
            },

            title: {
                text: 'Statistika vina'
            },

            series: [
                {
                    type: 'sunburst',
                    data: data,
                    allowDrillToNode: true,
                    cursor: 'pointer',

                    dataLabels: {
                        format: '{point.name}',
                        rotationMode: 'parallel'
                    },

                    levels: [
                        {
                            level: 1,
                            levelIsConstant: false,
                            dataLabels: {
                                filter: {
                                    property: 'outerArcLength',
                                    operator: '>',
                                    value: 64
                                }
                            }
                        },
                        {
                            level: 2,
                            colorByPoint: true
                        },
                        {
                            level: 3,
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }
                    ]
                }
            ],

            tooltip: {
                headerFormat: "",
                pointFormat: '<b>{point.name}</b>: {point.value}'
            }
        };

        return (
            <Container className="mt-4">

                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

            </Container>
        );
    }
}

/*

    const [podaci, setPodaci] = useState([]);
    const { showLoading, hideLoading } = useLoading();

    async function getPodaci() {
        showLoading();
        const odgovor = await .get();
        setPodaci(odgovor.data.map((vina) => {
            return {
                y:
                    name:
            };
        }));
        hideLoading();
    }

    useEffect(() => {
        getPodaci();
    }, []);


    const fixedOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'sunburst',
        },
        title: {
            text: 'Broj polaznika po grupi',
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                },
            },
        },
    };



return (
    <>
        <Container className='mt-4'>
            {podaci.length > 0 && (
                <PieChart
                    highcharts={Highcharts}
                    options={{
                        ...fixedOptions,
                        series: [
                            {
                                name: 'Polaznici',
                                colorByPoint: true,
                                data: podaci,
                            },
                        ],
                    }}
                />
            )}
        </Container>
    </>
)
};

*/