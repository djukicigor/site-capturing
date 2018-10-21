import { Meteor } from 'meteor/meteor';

import { Sites } from '../sites.js';

Meteor.publish('all.sites', function publishAllSites() {
    return Sites.find({}, {
        fields: {
            name,
            address,
            image
        }
    })
})

Meteor.publish('site', function publishAllSites(siteId) {
    return Sites.find({ _id: siteId }, {
        fields: {
            name,
            address,
            image
        }
    })
})