var validateUsername = function() {
	var username = $(this);
	var errorMsg = username.next();
	var controlGroup = username.parent().parent();
  	if(username.val().length < 4){
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Username too short.");
  		errorMsg.show();
  	} else {
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  	}
};

var validatePasswordRepeat = function() {
	var passwordRep = $(this);
	var password = $('#password');
	var errorMsg = passwordRep.next();
	var controlGroup = passwordRep.parent().parent();
  	if(passwordRep.val() == password.val()){
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  	} else {
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Passwords do not match!");
  		errorMsg.show();
  	}
};

var validatePassword = function() {
	var password = $(this);
	var errorMsg = password.next();
	var controlGroup = password.parent().parent();
  	if(password.val().length < 4){
  		controlGroup.addClass('error').removeClass('success').removeClass('warning');
  		errorMsg.text("Password too short!");
  		errorMsg.show();
  	} else if(password.val().length < 8){
  		controlGroup.addClass('warning').removeClass('error').removeClass('success');
  		errorMsg.text("Password weak.");
  		errorMsg.show();
  	} else {
  		controlGroup.addClass('success').removeClass('error').removeClass('warning');
  		errorMsg.hide();
  	}
};

var validateEmail = function() {
	var email = $(this);
	var errorMsg = email.next();
	var controlGroup = email.parent().parent();
  	if(email.val().indexOf("@") == -1){
  		controlGroup.addClass('error').removeClass('success');
  		errorMsg.text("Email should contain @ sign.");
  		errorMsg.show();
  	} else {
  		controlGroup.removeClass('error').addClass('success');
  		errorMsg.hide();
  	}
};

$('#username').keyup(validateUsername);
$('#passwordRepeat').keyup(validatePasswordRepeat);
$('#password').keyup(validatePassword);
$('#email').keyup(validateEmail);