import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Database connection failed:', err));

export default sequelize;


