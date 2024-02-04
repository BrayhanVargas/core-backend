import { DataTypes } from 'sequelize'
import { sequelize } from '../services/db/db.service.js'

const GeneralInfo = sequelize.define('general_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  request_date: {
    type: DataTypes.DATE
  },
  inspection_date: {
    type: DataTypes.DATE
  },
  report_delivery_date: {
    type: DataTypes.DATE
  },
  insurance_company: {
    type: DataTypes.STRING(255)
  },
  agency: {
    type: DataTypes.STRING(255)
  },
  authorizing_officer: {
    type: DataTypes.STRING(255)
  },
  insurance_advisor: {
    type: DataTypes.STRING(255)
  },
  risk_name: {
    type: DataTypes.STRING(255)
  },
  nit_id: {
    type: DataTypes.STRING(20)
  },
  activity: {
    type: DataTypes.STRING(255)
  },
  contact_name: {
    type: DataTypes.STRING(255)
  },
  contacts_position: {
    type: DataTypes.STRING(255)
  },
  phone: {
    type: DataTypes.STRING(15)
  },
  email: {
    type: DataTypes.STRING(255)
  },
  address: {
    type: DataTypes.STRING(255)
  },
  neighborhood: {
    type: DataTypes.STRING(255)
  },
  city: {
    type: DataTypes.STRING(255)
  },
  department: {
    type: DataTypes.STRING(255)
  },
  report_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reports',
      key: 'id'
    }
  }
})

GeneralInfo.sync({ force: false })

export default GeneralInfo
