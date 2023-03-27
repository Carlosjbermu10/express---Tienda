import axios from 'axios';

import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from '../config.js';

import  requestt  from 'express';

export const paypal = async (request, total) => {

    try {
        
        const value = total.toString()

        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "5"
                    },
                    description: "compra",
                },
            ],
            application_context: {
                brand_name: "Tienda Online",
                landing_page: "LOGIN",
                user_action: "PLAY_NOW",
                return_url: "http://localhost:3000/product",
                cancel_url: "http://localhost:3000/car",
            }
        }

        const response = await requestt.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET,
            },
            json: true
        })

        /*const params = new URLSearchParams()
        params.append("grant_type", "client_credentials")

        const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET,
            }
        })

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })*/

        console.log(response)

    } catch (error) {
        console.log(error)
    }

}