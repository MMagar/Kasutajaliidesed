var UserSession = {
	init: function (config) {
	    $('#logoutForm').hide();
	    this.emailField = $('#email');
	    this.passwordField = $('#password');
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

    logIn: function(){
        var self = UserSession;
        self.generateAuthorizationString(self.loginEmailField.val(), self.loginPasswordField.val());
        var loginInfo = {
            email: self.loginEmailField.val(),
            authString: self.authString
        };
        console.log(loginInfo);
        $.post('login', loginInfo, function(data){
            if(data.result == "Login success"){
                self.loginSuccess();
            } else {
                alert("Login failed" + data.result);
            }
        });
        return false;
    },

    loginSuccess: function(){
        $.cookie("email", UserSession.loginEmailField.val());
        $.cookie("auth", UserSession.authString);
        $('#username').text(UserSession.loginEmailField.val());
        $('#loginForm').hide();
        $('#logoutForm').show();
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
        console.log("attempt reg...");
        console.log(validateRegForm());
        if(validateRegForm() == true){
            UserSession.sendRegisterRequest();
        }
    },

    sendRegisterRequest: function(){
        var self = UserSession;
        self.generateAuthorizationString(self.emailField.val(), self.passwordField.val());
        var registrationInfo = {
            email: UserSession.emailField.val(),
            authString: UserSession.authString
        };
        console.log("Registering with:");
        console.log(registrationInfo);
        $.post('register', registrationInfo, function(data){
            if(data.result == "User registered!"){
                alert("Reg success");
            } else {
                alert("Reg failed" + data.result);
            }
        });
    },

    generateAuthorizationString: function(email, password){
        var self = UserSession;
        var combinedString = email + ":" + password;
        UserSession.authString = $.base64.encode(combinedString);
    },

    getUserTaskIds: function(){}
};