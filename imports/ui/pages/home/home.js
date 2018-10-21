import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './home.html';
import '../../components/capture/capture.js';
import '../../components/sites/sites.js';

Template.App_home.helpers({
    submitSite: () => {
        return {
            onSubmit(val) {
                Meteor.call('takeScreenshot', { address: val }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        (async () => {
                            const siteId = await data;
                            FlowRouter.go('App.site', { id: siteId })
                        })();
                    }
                })
            }
        }
    }
});