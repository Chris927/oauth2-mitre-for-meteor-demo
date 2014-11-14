if (Meteor.isClient) {

  Template.hello.helpers({
    email: function() {
      return Meteor.user() ? Meteor.user().services.mitre.email : null;
    },
    id: function() {
      return Meteor.user() ? Meteor.user().services.mitre.id : null;
    }
  });

  Template.hello.events({
    'click .login': function () {
      Meteor.loginWithMitre({}, function(err) {
        if (err) {
          console.log('loginWithMitre, err=', err);
        }
      });
    },
    'click .logout': function() {
      Meteor.logout();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.remove({
      service: 'mitre'
    });
    ServiceConfiguration.configurations.insert({
      service: 'mitre',
      clientId: 'fill in',
      loginStyle: 'redirect',
      secret: 'fill in',
      issuer: 'https://myauthserver.com',
      requestPermissions: [ 'email', 'userinfo', 'openid' ]
    });
  });
}
