import {Sequelize} from 'sequelize'
console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL ?? "")

export default sequelize