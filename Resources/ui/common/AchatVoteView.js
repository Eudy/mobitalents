var Paypal = require('ti.paypal');

var saveVideo = {
    envoie:''
};


function AchatVote(){
    var Theme = require('ui/mobi/Theme');
    var Button = require('ui/mobi/Button');
var InfoUser = require('ui/mobi/InfoUser');
    var self = Ti.UI.createScrollView({
        top: '7.5%',
        left: '5%',
        width: '100%',
        height: '100%',
        layout: 'vertical'
    });
    var paquetVote5 = Ti.UI.createLabel({
        height: 45,left:5, color: '#FEFEFE',
        text: 'Un paquet 5 vote 5 Euros'
    });
    self.add(paquetVote5);
    var paquetVote5Field = Ti.UI.createTextField({
        color: Theme.textColor,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: 450,
        height: 80,
        left:100,
        hintText: 'Combien de paquet',
        keyboardType: Ti.UI.KEYBOARD_DEFAULT
    })

    self.add(paquetVote5Field);


    var paquetVote20 = Ti.UI.createLabel({
        height: 45,left:5, color: '#FEFEFE',
        text: 'Un paquet 20 vote 15 Euros'
    });
    self.add(paquetVote20);
    var paquetVote20Field = Ti.UI.createTextField({
        color: Theme.textColor,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: 450,
        height: 80,
        left:100,
        hintText: 'Combien de paquet',
        keyboardType: Ti.UI.KEYBOARD_DEFAULT
    })

    self.add(paquetVote20Field);

	
    var paquetVote50 = Ti.UI.createLabel({
        height: 45,left:5, color: '#FEFEFE',
        text: 'Un paquet 50 vote 30 Euros'
    });
    self.add(paquetVote50);
    var paquetVote50Field = Ti.UI.createTextField({
        color: Theme.textColor,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: 450,
        height: 80,
        left:100,
        hintText: 'Combien de paquet',
        keyboardType: Ti.UI.KEYBOARD_DEFAULT
    })

    self.add(paquetVote50Field);

    var validerButton = Button("Valider panier");

	self.add(validerButton);

    validerButton.addEventListener('click', function(e) {


	if(paquetVote5Field.value =='' && paquetVote20Field.value =='' && paquetVote50Field.value =='' ){
            alert("panier vide");
	}

	else{



            var u = Ti.Android != undefined ? 'dp' : 0;

            var status = Ti.UI.createLabel({
                top: 10 + u, height: 45 + u, color: '#FEFEFE',
                text: 'Loading, please wait...'
            });
            self.add(status);

            var	nombre5=paquetVote5Field.value	;
            var	nombre20=paquetVote20Field.value;
            var	nombre50=paquetVote50Field.value;

            var tot5=5*nombre5;
            var tot20=15*nombre20;
            var tot50=30*nombre50;
            var total = parseInt(tot5)+ parseInt(tot20) + parseInt(tot50);

            var nbreVote= parseInt(nombre5)*parseInt(5) + parseInt(nombre20)*parseInt(20) + parseInt(nombre50)*parseInt(50);

            var button = Paypal.createPaypalButton({
                // NOTE: height/width only determine the size of the view that the button is embedded in - the actual button size
                // is determined by the buttonStyle property!
                width: 210 + u, height: 67 + u,
                buttonStyle: Paypal.BUTTON_194x37, // The style & size of the button
                bottom: 20 + u,

                language: 'en_FR',
                textStyle: Paypal.PAYPAL_TEXT_PAY, // Causes the button's text to change from "Pay" to "Donate"

                appID: 'APP-80W284485P519543T', // The appID issued by Paypal for your application; for testing, feel free to delete this property entirely.
                paypalEnvironment: Paypal.PAYPAL_ENV_SANDBOX, // Sandbox, None or Live

                feePaidByReceiver: false,
                enableShipping: false, // Whether or not to select/send shipping information

                payment: { // The payment itself
                    paymentType: Paypal.PAYMENT_TYPE_SERVICE, // The type of payment
                    subtotal: total, // The total cost of the order, excluding tax and shipping
                    tax: 0,
                    shipping: 0,
                    currency: 'USD',
                    recipient: 'mobita_1358233774_biz@gmail.com',
                    customID: 'xknei874',
                    invoiceItems: [
                        { name: 'Vote5', totalPrice: tot5, itemPrice: 5, itemCount: nombre5 },
                        { name: 'Vote20', totalPrice: tot20, itemPrice: 15, itemCount: nombre20 },
                        { name: 'Vote50', totalPrice: tot50, itemPrice: 30, itemCount: nombre50 }
                    ],
                    ipnUrl: 'http://www.appcelerator.com/',
                    merchantName: 'Dev Tools',
                    memo: 'For the orphans and widows in the world!'
                }
            });

            // Events available
            button.addEventListener('paymentCancelled', function (e) {
                status.text = 'Payment Cancelled.';
                // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
            //    addButtonToWindow();
            });
            button.addEventListener('paymentSuccess', function (e) {
                SaveVideo(nbreVote);
                status.text = 'Payment Success.  TransactionID: ' + e.transactionID + ', Reloading...';
                // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
            //    addButtonToWindow();
            });
            button.addEventListener('paymentError', function (e) {
                status.text = 'Payment Error,  errorCode: ' + e.errorCode + ', errorMessage: ' + e.errorMessage;
                // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
           //     addButtonToWindow();
            });

            button.addEventListener('buttonDisplayed', function () {status.text = 'Payez avec Paypal'; });
            button.addEventListener('buttonError', function () {status.text = 'The button failed to display!';});
            self.add(button);
      //  });
     //   self.add(button);

}
});
return self;

}

function SaveVideo(nbreVote){

var InfoUser = require('ui/mobi/InfoUser');



var xhr = Titanium.Network.createHTTPClient();

xhr.onerror = function(e)
{
    var	err = 'HTTP Error (last state: saveDbVideo) (onerror: ' + e.error + ')';
    alert(err);
};

xhr.onload = function(){

    switch (saveVideo.envoie) {
        case 'fait' :
        alert("ici");
            var json = JSON.parse(this.responseText);
            if (!json) {
                alert('Error - Null return!');
                return ;
            }
            if(json.logged==true){
                alert("Achat  validation");
            }
            else
                alert("achat non valider");
            saveVideo.envoie='idl';
            break;

        default :
            Ti.API.info('Unknown state during YouTube upload!');
            var errormsg = 'Bad state ';
            Ti.App.fireEvent('youtube:error', {});
            break;
    }
};

var params = {
    requete:'achatVote',
    idPseudo:InfoUser.id,
    nbreAchat:  nbreVote
};
saveVideo.envoie= 'fait';
xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');
xhr.send(params);

}

module.exports = AchatVote;