import { Sequelize } from 'sequelize';
import envConfigs from "./db.config";
const env: string = process.env.NODE_ENV || 'development';
const config: any = envConfigs[env];
let sequelize: any;

if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize;
