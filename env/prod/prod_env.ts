import { EnvironmentI } from '../interface/environments_i';

export class ProdEnv implements EnvironmentI {
    openLinkToPayMercadoPago: string = 'sandbox_init_point';
    accessTokenMercadoPago: string = 'APP_USR-3138455051991516-060114-4185c9aa219df10a7e9f3cdea0221042-654694341'
    hostname: string = 'https://e-commerce-b.herokuapp.com';
}