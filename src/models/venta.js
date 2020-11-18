module.exports = class Venta {
    constructor(id, id_cliente, fecha, total, isvalido) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.fecha = fecha;
        this.total = total;
        this.isvalido = isvalido;
    }
}