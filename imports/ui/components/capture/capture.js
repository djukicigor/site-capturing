import './capture.html';

Template.App_capture.events({
    'submit #js-capture': function(event, template) {
        event.preventDefault();
        let address = event.currentTarget[0].value;
        address = address.replace(/(^\w+:|^)\/\//, '')
        address = address.replace('/', '');
        template.data.onSubmit(address)
    }
});