import sequelize from '../db'
import { DataTypes, Model } from 'sequelize'

interface LikesModel extends Model {
  id: string
  isLike: boolean
}
const getLikesModel = (name: string) => {
  return sequelize.define<LikesModel>(name, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isLike: {
      type: DataTypes.BOOLEAN,
    },
  })
}

export default getLikesModel
