import React, { Fragment, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Tab, Tabs } from 'react-bootstrap';

import Bebida from './Bebida';
import Busqueda from "./Busqueda";
import Carrito from "./Carrito";

const Compras = () =>{

    const [listaBebidas, setListaBebidas] = useState([]);
    
    useEffect(() => {
        consultarApi();
    }, []);//listaBebidas


    //Funcion para consultar la Api y traer informacion
    const consultarApi = async() => {
        try{
            
            const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass');
            const bebida = await api.json();
            setListaBebidas(bebida.drinks);
            
        }catch(error){
            console.log(error);
        }
    }
    
     // Funcionalidad del localstorage

    let almacenamientoLocalCarrito = JSON.parse(localStorage.getItem("carrito"))
     if(!almacenamientoLocalCarrito){
        almacenamientoLocalCarrito = [];
    };
    
    const [carrito, setCarrito] = useState(almacenamientoLocalCarrito)
    
    useEffect(() => {
        if (almacenamientoLocalCarrito) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            localStorage.setItem('carrito', JSON.stringify([]));
        };
    }, [almacenamientoLocalCarrito]);

    // Fin Funcionalidad localStorage

    const cantidadBebidasCarrito = almacenamientoLocalCarrito.length;
    
    return(
        <Fragment>
            {consultarApi}
            <div className="contenedor">
                
                <Tabs
                    defaultActiveKey="Lista"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Lista" title="Lista">
                        <div className="contenedorCompras">
                            <div className="contenedorGrid">
                                {
                                    listaBebidas.map(
                                        bebida => (
                                            <Bebida 
                                                key={bebida.idDrink}
                                                bebida = {bebida}
                                                listaBebidas={ listaBebidas }
                                                carrito = { carrito }
                                                setCarrito={ setCarrito }                                                
                                            />
                            
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </Tab>
                    
                    <Tab eventKey="Busqueda" title="Busqueda">
                        <div>
                            <Busqueda 
                                listaBebidas = { listaBebidas }
                                carrito = { carrito }
                                setCarrito={ setCarrito }
                                />
                        </div>
                    </Tab>
                    
                    <Tab eventKey="Carrito" title= { "Carrito " + cantidadBebidasCarrito }> 
                        <Carrito 
                            carrito = { carrito }
                            setCarrito = { setCarrito }
                        />
                    </Tab>
                </Tabs>
            </div>
        </Fragment>
    );
};

export default Compras;

/*
carrito.length()
*/