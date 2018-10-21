import './capture.html';

Template.App_capture.events({
    'submit #js-capture': function(event, template) {
        event.preventDefault();
        let address = document.getElementById('js-textbox').value;
        event.currentTarget.parentElement.classList.add('loading')
        address = address.replace(/(^\w+:|^)\/\//, '')
        address = address.replace('/', '');
        template.data.onSubmit(address)
    }
});