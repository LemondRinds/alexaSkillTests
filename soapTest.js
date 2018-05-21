const EasySoap = require('easysoap');
const soapHdr = {
    host               : 'http://www.thomas-bayer.com',
    path               : '/axis2/services/BLZService',
    wsdl               : '/axis2/services/BLZService?wsdl',
	headers: [{
			'namespace': 'http://thomas-bayer.com/blz/'
	   }],
	rejectUnauthorized : false
}
const soapOpts = {
    secure : false
}
const soapClient = EasySoap(soapHdr, soapOpts);
soapClient.getAllFunctions()
   .then((functionArray) => { console.log(functionArray); })
   .catch((err) => { console.log('Err ' + err); });

