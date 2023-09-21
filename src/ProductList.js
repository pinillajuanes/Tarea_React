import React, { useEffect, useState } from 'react';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false); // Estado para mostrar todos los productos

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const chunkSize = 3; // Tamaño del conjunto
  const maxVisibleProducts = showAll ? products.length : 6; // Muestra todos los productos si showAll es verdadero

  const productChunks = Array.from(
    { length: Math.ceil(maxVisibleProducts / chunkSize) },
    (_, index) => products.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  // Función para manejar el clic en el botón "Ver más"
  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <table className="product-table">
        <tbody>
          {productChunks.map((chunk, rowIndex) => (
            <tr key={rowIndex}>
              {chunk.map((product) => (
                <td key={product.id} className="product-cell">
                  <div className="product-content">
                    <h3>{product.title}</h3>
                    <img src={product.image} alt={product.title} width="150" />
                    <p>{product.description}</p>
                    <strong>Precio: ${product.price}</strong>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!showAll && (
        <button onClick={handleShowAllClick}>Ver más</button>
      )}
    </div>
  );
}

export default ProductList;
