// I'm using Flow Router Extra because it gives a lot of new features
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/body/body.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    this.render('App_body', 'App_home');
  },
  waitOn() {
    return import('../../ui/pages/home/home.js')
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
  waitOn() {
    return import('../../ui/pages/not-found/not-found.js');
  }
};
