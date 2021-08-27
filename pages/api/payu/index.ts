import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    // ...
    console.log('req')
    console.log(req.body)
    console.log('req')
    return res.send('hola')
}