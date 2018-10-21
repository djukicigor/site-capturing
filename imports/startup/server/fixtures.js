// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Sites } from '../../api/sites/sites.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Sites.find().count() === 0) {
    const data = [
      {
        name: 'Google',
        url: 'https://www.google.com',
        createdAt: new Date(),
        image: 'Google'
      },
      {
        name: 'Apple',
        url: 'https://www.apple.com',
        createdAt: new Date(),
        image: 'Apple'
      },
    ];

    data.forEach(site => Sites.insert(site));
  }
});
