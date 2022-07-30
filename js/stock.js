export const traerDatos = async() => {
    let respuesta = await fetch('./json/stock.json')
    return respuesta.json()

}