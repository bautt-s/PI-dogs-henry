import React from 'react';
import './Paginado.css'


const Paginado = ( {pagActual, numMinPag, numMaxPag, perrosPorPag, dogs, paginado} ) => {
    const numerosPagina = []; // array usado para guardar la cantidad de páginas necesarias
    const indexNecesarios = Math.ceil(dogs / perrosPorPag); // razas totales dividido perros por página (8), nos dará los indexes que necesitamos

    for (let i = 1; i <= indexNecesarios; i++) numerosPagina.push(i); // obtengo los números que necesito

    const handleAnterior = () => (pagActual - 1) && paginado(pagActual - 1); // si hay una pag anterior, muevo la página un lugar atrás
    const handleSiguiente = () => (pagActual !== numerosPagina.length) && paginado(pagActual + 1); // si hay una pag siguiente, muevo la página un lugar adelante

    return (
        <nav className="paginado">
            <ul>
                <li className= {pagActual === 1 ? 'numPag disabled' : 'numPag'} onClick={handleAnterior}>◀</li>

                {numerosPagina && numerosPagina.slice(numMinPag, numMaxPag).map(num => (
                    <li className={pagActual === num ? 'numPag pagActiva' : 'numPag'} key={num} onClick={() => paginado(num)}>
                        { num }
                    </li>
                ))}

                <li className={pagActual === numerosPagina.length ? 'numPag disabled' : 'numPag'} onClick={handleSiguiente}>▶</li>
            </ul>
        </nav>
    );
}


export default Paginado;