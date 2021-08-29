import { EnvironmentI } from '../interface/environments_i';

export class DevEnv implements EnvironmentI {
    openLinkToPayMercadoPago: string = 'sandbox_init_point';
    accessTokenMercadoPago: string = 'TEST-3138455051991516-060114-bb1d75e02f120baf9d879042d4388322-654694341';
    hostname: string = 'http://localhost:3000';
}