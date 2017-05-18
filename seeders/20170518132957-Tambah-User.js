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
    return queryInterface.bulkInsert('Users', [{
      name: 'sidik',
      username: 'juragansidik',
      email: 'sidik@juragan.com',
      password: 'kamartidur',
      telp: '08176921531',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'pakAmbo',
      username: 'juraganAmbo',
      email: 'ambodalle@juragan.com',
      password: 'kamartamu',
      telp: '080989999',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
