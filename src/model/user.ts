// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    public id!: number;
    public name!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user'
        },
        hashedPassword: {
            type: DataTypes.STRING(300),
            allowNull: false,
            validate: {
                notEmpty: true
            },
            set(value: string) {
                this.setDataValue('hashedPassword', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
            }
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
