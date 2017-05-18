'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rooms = sequelize.define('Rooms', {
    room_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    lokasi: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Rooms.hasMany(models.Post, {
          foreignKey : 'room_id'
        })
        Rooms.hasOne(models.Vote,{
          foreignKey : 'room_id'
        })

      }
    }
  });
  return Rooms;
};
