import React, { useState, useEffect } from 'react';

// CSS
import './styles.css';

import Geocode from "react-geocode";


export default function Home() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [endereco, setEndereco] = useState('');

    function configInicial() {
        Geocode.setApiKey("AIzaSyAls0b_qqCcXTG6n47K0f_E2LXPttDEClw");
        Geocode.setLanguage("pt-BR");
        Geocode.setRegion("BR");

        // Habilitando debug é opcional.
        Geocode.enableDebug();
    }

    useEffect(() => {
        configInicial();
    }, []);

    async function enderecoParaCoordenada(e) {
        setLatitude(0);
        setLongitude(0);
        Geocode.fromAddress(e).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                setLatitude(lat);
                setLongitude(lng);
                console.log(lat, lng);
            },
            error => {
                console.error(error);
            })
    }

    async function coordenadasParaEndereco(lat, long) {
        setEndereco('');
        Geocode.fromLatLng(lat, long).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
                setEndereco(address);
            },
            error => {
                console.error(error);
            }
        );
    }

    return (
        <div className="home-container">
            <section className="form">
                <form>
                    <h1>Insira seu endereço</h1>

                    <input
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />


                    <h1>Latitude</h1>
                    <input
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />

                    <h1>Longitude</h1>
                    <input
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </form>
                <button className="buttonEndereco" onClick={() => enderecoParaCoordenada(endereco)}>Converter Endereço</button>
                <button className="buttonCoordenadas" onClick={() => coordenadasParaEndereco(latitude, longitude)}>Converter Coordenadas</button>
            </section>

            <section className="form">
                <h1>Resultados:</h1>
                <h3>Endereço:</h3> <h4>{endereco}</h4>
                <h3>Latitude:</h3> <h4>{latitude}</h4>
                <h3>Longitude:</h3> <h4>{longitude}</h4>
            </section>

        </div>
    );
}
