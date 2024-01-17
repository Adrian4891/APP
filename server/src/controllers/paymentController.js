require("dotenv").config();
const  MERCADOPAGO_KEY  = process.env.MERCADOPAGO_KEY;
const mercadopago = require("mercadopago");
const { Payments } = require("../dbConexion");
const { Cart } = require("../dbConexion");

mercadopago.configure({
    access_token: MERCADOPAGO_KEY
});
const createPayment = async (req, res) =>{
    try {
        const { id } = req.params;
        const products = req.body[0]
        const userData = req.body[1]

        if(!products.length) throw Error("No hay productos que comprar");
        const items = [];
        if (products.length > 1) {
            products.forEach(product => {
                const item = {
                    id: product.ProductId,
                    title: product.name,
                    currency_id: "ARS",
                    picture_url: product.image,
                    description: product.description,
                    category_id: product.category,
                    quantity: product.amount,
                    unit_price: product.price,
                }
                items.push(item);
            });   
        } else {

            const item = {
                id: products[0].id,
                title: products[0].name,
                currency_id: "ARS",
                picture_url: products[0].image,
                description: products[0].description,
                category_id: products[0].category,
                quantity: products[0].amount,
                unit_price: products[0].price,
            }
            items.push(item);
        }
        let preference = {
            items,
                payer: {
                name: userData.name.toString(),
                surname: userData.lastName.toString(),
                email: "user@email.com",
                phone: {
                    area_code: userData.areaCode ,
                    number: parseInt(userData.numTel)
                },
                identification: {
                    type: "DNI",
                    number: userData.dni.toString()
                },
                address: {
                    street_name: userData.street,
                    street_number: parseInt(userData.number),
                    zip_code: userData.codPostal.toString()
                }
            },
            back_urls:{
                success: "https://barekintrumentsapp-production.up.railway.app/",
                failure:"https://barekintrumentsapp-production.up.railway.app/",
                pending:"https://barekintrumentsapp-production.up.railway.app/"
            },
            auto_return: "approved",
            binary_mode: true,
            notification_url: `https://barekintrumentsapp-production.up.railway.app/payments/notifications/${id}`,
            statement_descriptor: "BarekMusic",
            external_reference: "Reference_1234",    
        }
       const response = await mercadopago.preferences.create(preference)
       res.status(200).json(response.body.init_point);
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
}


const successRes = async (req, res) => {
    try {
        return await res.status(200).send("el pago se realizo");
    } catch (error) {
       return await res.status(500).send(error);
    }
}

const failResponse = async (req, res) => {
    try {
        return await res.status(200).send("el pago fallo");
    } catch (error) {
        return await res.status(500).send(error);
    }
}

const pendingResponse = async (req, res) => {
    try {
        return await res.status(200).send("el pago esta en pendiente")
    } catch (error) {
        return await res.status(500).send(error);
    }
}

const notificationPayment = async (req, res) => {
    try {
        const type =  req.body.type;
       if(type === "payment"){

            const { id } = req.body.data;
            const userId = req.params.id;
            const paymentsUser = await payment.findById(id);
            const items = paymentsUser.body.additional_info.items;
        
            items.forEach(async(item)=>{
                if (items.length > 1) {
                    delProductsCart( item.id, userId);
                }

                const compra = {
                    name: item.title,
                    image: item.picture_url,
                    quantity: item.quantity,
                    price: item.unit_price,
                    category: item.category_id,
                    description: item.description,
                    score: false,
                    productId: item.id,
                    userId,
                    paymentId: id
                }
                await Payments.create(compra);
            });

        return res.status(200).json(items);       
    }
        
    } catch (error) {
        return res.status(400).send(error)
    }
}

// remueve los productos del carrito luego de la compra.
const delProductsCart = async (id, UserId) => {
    try {
        const product = await Cart.findOne({
            where:{
               UserId,
               ProductId:id
            } 
        }); 
       if(!product) throw Error("El producto no se pudo encontrar");
       await product.destroy();
       return "Se quitaron los productos pagados";
    } catch (error) {
        return error.message;
    }
}

const findPayments = async(req, res) => { //"/payments/detail"
    try {

        const { id } = req.params;
        const paymentsUser = await payment.findById(id);
        if(!paymentsUser) throw Error("No se encontro el pago");
        const items = paymentsUser.body. additional_info.items
      
       const detailtPayment = {
          metodo:paymentsUser.body.payment_method.id,
          type:paymentsUser.body.payment_method.type,
          status:paymentsUser.body.status,
          totalPaidAmount :paymentsUser.body.transaction_details.total_paid_amount,
          urlPaymentPending: paymentsUser.body.transaction_details.external_resource_url
       } 
        items.push(detailtPayment);
        return res.status(200).json(items);
    } catch (error) {
        res.status(404).send(error)
    }
} 


//http://localhost:3001/compras/payments

const getPayments = async (req, res) => {
    try {
        const { id } = req.params;
        const findPayments = await Payments.findAll({
            where:{
              userId:id
            },
            order:[["createdAt","ASC"]]
        });
        if(!findPayments) throw Error("No se encontraron los pagos");
        return res.status(200).json(findPayments);
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payments.findOne({
            where:{
                paymentId: id
            }
        });
        if(!payment) throw Error("El pago no fue encontrado");
        await payment.destroy();
        return res.status(200).send("El pago se borro");
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    createPayment, 
    successRes, 
    failResponse, 
    pendingResponse, 
    notificationPayment, 
    findPayments, 
    getPayments,
    deletePayment
}