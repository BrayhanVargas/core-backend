import Sequelize from 'sequelize'

// Configuration options for the database connection
const dbOptions = {
  host: 'localhost',
  username: 'postgres',
  password: 'Juanes2010',
  database: 'core-report',
  dialect: 'postgres'
}

// Declare the Sequelize instance using the configuration options
export const sequelize = new Sequelize(dbOptions)

// Check the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
