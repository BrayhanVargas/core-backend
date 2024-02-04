import { DataTypes } from 'sequelize'
import { sequelize } from '../services/db/db.service.js'

const Report = sequelize.define('reports', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    field: 'user_id',
    allowNull: false
  },
  riskName: {
    type: DataTypes.STRING,
    field: 'risk_name',
    allowNull: false
  },
  coverImg: {
    type: DataTypes.STRING,
    field: 'cover_img',
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
})

Report.sync({ force: false })

export default Report
