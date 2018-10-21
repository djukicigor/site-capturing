// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Sites } from '../../api/sites/sites.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Sites.find().count() === 0) {
    const data = [
      {
        name: 'Google',
        address: 'www.google.com',
        createdAt: new Date(),
        image: {
          url: 'https://i.imgur.com/jvbMFEi.png',
          deletehash: 'cjb4fztMG0G2sGl'
        }
      },
      {
        name: 'Facebook',
        address: 'www.facebook.com',
        createdAt: new Date(),
        image: {
          url: 'https://i.imgur.com/Dp4QLM6.png',
          deleteHash: 'u01dsqVgzmALlbB',
        }
      },
    ];

    data.forEach(site => Sites.insert(site));
  }
});
