'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Rooms', [{
        room_name: 'Villa Mutiara',
        description: 'Blablablablablablaaksjaksjaksjaksjkajskasjkasjkajskajsk',
        imagePath: 'testing',
        lokasi : 'Jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
      room_name: 'Villa Benua',
      description: 'Blablablablablablaaksjaksjaksjaksjkajskasjkasjkajskajsk',
      imagePath: 'testing2',
      lokasi : 'Bandung',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      room_name: 'Tulip Benua',
      description: 'Blablablablablablaaksjaksjaksjaksjkajskasjkasjkajskajsk',
      imagePath: 'testing3',
      lokasi : 'Jakarta',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
