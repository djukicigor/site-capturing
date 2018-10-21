import { Meteor } from 'meteor/meteor';

import { Sites } from '../sites.js';

Meteor.publish('all.sites', function publishAllSites() {
    return Sites.find({}, {
        fields: {
            image: 1
        }
    })
})

Meteor.publish('site', function publishSite(siteId) {
    return Sites.find({ _id: siteId }, {
        fields: {
            name: 1,
            address: 1,
            image: 1
        }
    })
})