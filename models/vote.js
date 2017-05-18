'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    count: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    room_id: {
      type : {
        type : DataTypes.INTEGER,
        defaultValue : 0
      },
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
        Vote.belongsTo(models.Rooms, {
          foreignKey : 'room_id'
        })
      }
    }
  });
  return Vote;
};
