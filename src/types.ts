import { Like } from '@models/models'
import {
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
} from 'sequelize'

export default abstract class ModelWithLikes extends Model {
  declare addLike: HasManyAddAssociationMixin<Like, number>
  declare getLikes: HasManyGetAssociationsMixin<Like>
  declare createLike: HasManyCreateAssociationMixin<Like, 'UserId'>
}
