import {Model, DataTypes, Optional} from 'sequelize';
import sequelize from '../config/database';

interface TicketAttributes{
    id: number;
    title: string,
    description: string,
    status: 'open' | 'in_progress' | 'closed',
    priority: 'low' | 'medium' | 'high',
    createdBy: string,
    lastUpdatedBy: string,
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id' | 'title' | 'description' |'status' | 'priority' | "createdBy" | 'lastUpdatedBy'>{}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
    id!: number;
    title!: string;
    description!: string;
    status!: 'open' | 'in_progress' | 'closed';
    priority!: 'low' | 'medium' | 'high';

    public readonly createdBy!: string;
    public lastUpdatedBy!: string;
}

Ticket.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM ('open','in_progress','closed'),
            allowNull: false,
        },
        priority:{
            type: DataTypes.ENUM('low','medium','high'),
            allowNull: false,
        },
        createdBy:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastUpdatedBy:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Tickets',
    }
)

export default Ticket;
