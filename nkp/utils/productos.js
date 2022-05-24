const CANTIDAD_PRODUCTOS = 50

const nombres=["Hamburguesa", "Papas Fritas", "Aros de Cebolla", "Milanesas"]
const descripciones=["Carne vacuna, con queso", "Con provenzal y queso Chedar", "Con miel y ajo", "Con pure de papas"]

const random = (max, min = 0) => Math.floor((Math.random() * (max-min))) + min;

const generarNombre =() => `${nombres[random(nombres.length -1)]}`

const generarDescripcion =() => `${descripciones[random(descripciones.length -1)]}`

const generarPrecio = () => `${random(999, 100)}`

const crearProducto = () => {
    return {
        nombre: generarNombre(),
        descripcion: generarDescripcion(),
        precio: generarPrecio()
    }
}

const producto = Array.from({
    length: CANTIDAD_PRODUCTOS
}, crearProducto).map((obj, id) => ({id, ...obj}))

export default producto