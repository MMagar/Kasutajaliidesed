var UserSession = {
	init: function (config) {
	    $('#logoutForm').hide();
	    this.emailField = $('#email');
	    this.passwordField = $('#password');
	    this.passwordFieldRepeat = $('#passwordRepeat');
        this.loginEmailField = $('#loginEmail');
        this.loginPasswordField = $('#loginPassword');

	    var defaults = {

        };

        config = $.extend({}, defaults, config);
        this.config = config;
        $('#registerButton').click(UserSession.register);
        $('#loginButton').click(UserSession.logIn);
        $('#logoutButton').click(function(){
            console.log("logging out...");
            UserSession.logOut();
            return false;
        });

        if($.cookie("auth") != null){
            $('#loginForm').hide();
            $('#logoutForm').show();
        }
	    return this;
    },

    sendRegisterRequest: function(email, password){
        var self = UserSession;
        var authString = self.generateAuthorizationString(email, password);
        var registrationInfo = {
            email: email,
            authString: authString
        };
        console.log("Registering with:");
        console.log(registrationInfo);
        $.post('register', registrationInfo, function(data){
            if(data.result == "User registered!"){
                self.registrationSuccessful();
            } else {
                alert("Reg failed" + data.result);
            }
        });
    },

    registrationSuccessful: function() {
        var self = UserSession;
        $('#registerModal').modal('hide');
        var email = self.emailField.val();
        var authString = self.generateAuthorizationString(email, self.passwordField.val());
        self.emailField.val('');
        self.passwordField.val('');
        self.passwordFieldRepeat.val('');
        self.loginSuccessful(email, authString);
    },

    logIn: function(){
        var self = UserSession;
        var email = self.loginEmailField.val();
        var authString = self.generateAuthorizationString(email, self.loginPasswordField.val());
        var loginInfo = {
            email: email,
            authString: authString
        };
        console.log(loginInfo);
        $.post('login', loginInfo, function(data){
            if(data.result == "Login success"){
                self.loginSuccessful(email, authString);
            } else {
                alert("Login failed" + data.result);
            }
        });
        return false;
    },

    loginSuccessful: function(email, authString){
        var self = UserSession;
        self.email = email;
        self.authString = authString;
        $.cookie("email", email);
        $.cookie("auth", authString);
        $('#username').text(email);
        $('#loginForm').hide();
        $('#logoutForm').show();
        self.loginEmailField.val('');
        self.loginPasswordField.val('');
    },

    logOut: function(){
        console.log("nulling cookies");
        $.cookie("email", null);
        $.cookie("auth", null);
        console.log("switching forms");
        $('#logoutForm').hide();
        $('#loginForm').show();
    },

    register: function(){
        var self = UserSession;
        if(validateRegForm() == true){
           self.sendRegisterRequest(self.emailField.val(), self.passwordField.val());
        }
    },

    generateAuthorizationString: function(email, password){
        var self = UserSession;
        var combinedString = email + ":" + password;
        return $.base64.encode(combinedString);
    },

    getUserTaskIds: function(){}
};