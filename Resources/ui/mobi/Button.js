//Mobitalents bouton
function Button(buttonText, buttonWidth, buttonBackgroundColor, marginTop, marginLeft, marginBottom, marginRight) {
	var Theme = require('ui/mobi/Theme');
	
	if(!buttonWidth)
	{ var buttonWidth = 'auto' }
	if(!marginLeft)
	{ var marginLeft = 0 }
	if(!marginTop)
	{ var marginTop = 0 }
	if(!marginBottom)
	{ var marginBottom = 0 }
	if(!marginRight)
	{ var marginRight = 0 }
	
	if(!buttonBackgroundColor)
	{ var buttonBackgroundColor = Theme.buttonBackgroundColor }
	
	var self = Ti.UI.createView({
		backgroundColor: buttonBackgroundColor,
		width: buttonWidth,
		height: 80,
		left: marginLeft,
		top: marginTop
	});	
	
	var shadow = Ti.UI.createView({
		backgroundColor: '#000',
		width: '100%',
		height: 5,
		left: marginLeft,
		top: marginTop+75,
		opacity: 0.5
	});		
	
	self.add(shadow);
	
	var label = Ti.UI.createLabel({
		color: Theme.buttonTextColor,
		text: buttonText,
		height:'auto',
		width:'80%',
		textAlign: 'center'
	});
	
	var animation = Ti.UI.createAnimation();
	animation.backgroundColor = Theme.selectedButtonBackgroundColor;
	animation.top = 10;
	animation.duration = 100;
	animation.addEventListener('complete', function() {
		animation.backgroundColor = Theme.buttonBackgroundColor;
		animation.top = 0;
		self.animate(animation);
	});
	
	self.addEventListener('click', function(e){
		self.animate(animation);
	});
	
	self.add(label);
	
	return self;
}

module.exports = Button;