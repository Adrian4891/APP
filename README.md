BarekMusic App está hecha con las siguientes tecnologías: React + Vite, Redux, Node, Express, PostgreSQL, Sequelize y Mercado Pago. Tiene las funcionalidades comunes de un e-commerce, como agregar al carrito, eliminarlo, elegir la cantidad, ponerle "Me gusta" al producto y agregarlo a favoritos; también se pueden eliminar productos de la lista de favoritos.

Utilicé Redux para crear un contexto global que incluye el carrito de compras, los productos favoritos, el historial de ordenes de compra y el rol del usuario. Puedes buscar productos por nombre, marca y categoría, además de filtrar por precio, tanto mínimo como máximo, e incluso establecer un tope en el precio.

Cada producto tiene su propio perfil, donde puedes agregarlo al carrito o comprarlo. También puedes realizar preguntas sobre el producto; en este caso, tengo un rol de administrador que permite responder a las preguntas. Cuando alguien responde a tus preguntas, recibirás una notificación, y tendrás la opción de hacer nuevas preguntas. El administrador también recibe notificaciones y puede eliminar las preguntas.

Para realizar compras, he integrado Mercado Pago. Tienes la posibilidad de comprar todo el carrito o un producto individualmente. Debes completar un formulario con tus datos, y luego serás redirigido a Mercado Pago, donde puedes elegir entre varias opciones de pago.

En la vista de compra, verás un resumen de tu compra, y detalle de pago. Aunque no ofrecemos envíos, puedes calificar el producto con estrellas y dejar un comentario. Los comentarios se muestran en el perfil del producto, junto con el promedio de calificaciones.

La aplicación es completamente responsive, utilice CSS modules y un poco de Bootstrap. Una deuda pendiente en este proyecto son las animaciones, no es que no las tiene podría tener más.
