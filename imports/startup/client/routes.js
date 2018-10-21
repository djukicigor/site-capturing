// I'm using Flow Router Extra because it gives a lot of new features
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/body/body.js';
import { Sites } from '../../api/sites/sites.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action(params, qs, sites) {
    this.render('App_body', 'App_home', { sites });
  },
  waitOn() {
    return [import('../../ui/pages/home/home.js'), Meteor.subscribe('all.sites')]
  },
  data() {
    return Sites.find();
  }
});

FlowRouter.route('*', {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
  waitOn() {
    return import('../../ui/pages/not-found/not-found.js');
  }
});
