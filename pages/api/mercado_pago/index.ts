import { NextApiRequest, NextApiResponse } from 'next'
import mercadoPago from "mercadopago";
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { Environments } from '../../../env/enviroments';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    mercadoPago.configure({
        access_token: Environments.interface.accessTokenMercadoPago 
    })

    const body = <CreatePreferencePayload>req.body;

    try {

        const resp = await mercadoPago.preferences.create(body)

        return res.send(resp.body)


    } catch (error) {

        console.log(`Ocurrio un error en API mercado pago ${error}`)
        return res.status(400).json({
            success: false,
            error: `Ocurrio un error en API mercado pago ${error}`,
            file: 'error file api/mercado_pago'
        })
    }
}