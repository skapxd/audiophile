import { DevEnv } from "./dev/dev_env";
import { ProdEnv } from './prod/prod_env';
import { EnvironmentI } from "./interface/environments_i";

export class Environments {
    public static interface: EnvironmentI = process.env.NODE_ENV === 'production'
        ? new ProdEnv()
        : new DevEnv()
}