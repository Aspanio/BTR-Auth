const Nexmo = require('nexmo');
const { nexmoKeys } = require('../../config/keys');
const nexmo = new Nexmo({
    apiKey: nexmoKeys.apiKey,
    apiSecret: '#', //Set value here from config/keys
}, {debug: true});

const Send = function(from, to, text){
    nexmo.message.sendSms(from, to, text, {type: 'unicode'}, (err, resData) => {
        if(err) {
            console.log('nexmo err: ',err)
        } else {
            console.dir(resData)
        }
    })
}
 
module.exports = Send;