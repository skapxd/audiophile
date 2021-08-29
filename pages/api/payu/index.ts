import { NextApiRequest, NextApiResponse } from 'next'
import mercadoPago from "mercadopago";
import { CreatePreferencePayload, PreferenceBackUrl, PreferenceItem, PreferencePayer, PreferencePaymentMethods, PreferenceShipment, PreferenceTrack } from 'mercadopago/models/preferences/create-payload.model';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    mercadoPago.configure({
        access_token: 'TEST-3138455051991516-060114-bb1d75e02f120baf9d879042d4388322-654694341'
    })

    // let preference: PreferencePayer = {
    // let preference: PreferenceBackUrl = {
    // let preference: PreferenceShipment= {
    // let preference: PreferenceItem= {
    // let preference: PreferenceTrack = {
    // let preference: PreferencePaymentMethods = {
    let preference: CreatePreferencePayload = {
        items: [{
            title: 'mi producto',
            unit_price: 100,
            quantity: 1
        }],
    }

    const resp = await mercadoPago.preferences.create(preference)

    return res.send('hola')
}