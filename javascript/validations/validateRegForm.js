function validateUsername() {
	var username = $('#username');
	var errorMsg = username.next();
	var controlGroup = username.parent().parent();
  	if(username.val().length < 4){
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Username too short!");
  		errorMsg.show();
  		return false;
  	} else {
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  		return true;
  	}
};

function validatePasswordRepeat() {
	var passwordRep = $('#passwordRepeat');
	var password = $('#password');
	var errorMsg = passwordRep.next();
	var controlGroup = passwordRep.parent().parent();
	var passwordGroup = controlGroup.prev();
  	if(passwordGroup.hasClass('error')){
  		controlGroup.removeClass('success').addClass('error');
  		errorMsg.hide();
  		return false;
  	} else if(passwordRep.val() == password.val()){
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  		return true;
  	} else {
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Passwords do not match!");
  		errorMsg.show();
  		return false;
  	}
};

function validatePassword() {
	var password = $('#password');
	var errorMsg = password.next();
	var controlGroup = password.parent().parent();
  	if(password.val().length < 4){
  		controlGroup.addClass('error').removeClass('success').removeClass('warning');
  		validatePasswordRepeat();
  		errorMsg.text("Password too short!");
  		errorMsg.show();
  		return false;
  	} else if(password.val().length < 8){
  		controlGroup.addClass('warning').removeClass('error').removeClass('success');
  		validatePasswordRepeat();
  		errorMsg.text("Password weak.");
  		errorMsg.show();
  		return false;
  	} else {
  		controlGroup.addClass('success').removeClass('error').removeClass('warning');
  		validatePasswordRepeat();
  		errorMsg.hide();
  		return true;
  	}
};

function validateEmail() {
	var email = $('#email');
	var errorMsg = email.next();
	var controlGroup = email.parent().parent();
  	if(email.val().indexOf("@") == -1){
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Email should contain @ sign.");
  		errorMsg.show();
  		return false;
  	} else {
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  		return true;
  	}
};

var validateRegForm = function(){
	var wasError = false;
	if(!validateUsername())
		wasError = true;
	if(!validatePassword())
		wasError = true;
	if(!validatePasswordRepeat())
		wasError = true;
	if(!validateEmail())
		wasError = true;
	return wasError;
};

$('#username').keyup(validateUsername);
$('#passwordRepeat').keyup(validatePasswordRepeat);
$('#password').keyup(validatePassword);
$('#email').keyup(validateEmail);
$('#registerButton').click(validateRegForm);