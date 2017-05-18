'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    room_id: {
      type : DataTypes.INTEGER,
      onDelete : 'CASCADE',
      reference : {
        model : 'Rooms',
        key : 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.belongsTo(models.Rooms, {
          foreignKey : 'room_id'
        })
      }
    }
  });
  return Post;
};
