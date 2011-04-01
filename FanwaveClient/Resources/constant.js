// constant

var baseUrl  = 'http://174.143.210.69:8080/fanwave/1.0/';
var username = '';
if ( Ti.App.Properties.hasProperty( "user" )) {
  username = Ti.App.Properties.getList('user')[0].value;//'ken.sun@wildmindcorp.com';
  }
