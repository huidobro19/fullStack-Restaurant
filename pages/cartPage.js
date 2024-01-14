import React from 'react';
import Cart from '../components/cart';

const CartPage = () => {
  return (
    <div>
      {/* Aquí puedes agregar cualquier encabezado o contenido específico de la página */}
      <h1 className="text-center">Your Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;