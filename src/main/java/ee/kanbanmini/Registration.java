package ee.kanbanmini;

import com.opensymphony.xwork2.Action;

/**
 * Created with IntelliJ IDEA.
 * User: Maks
 * Date: 17.05.12
 * Time: 22:19
 * To change this template use File | Settings | File Templates.
 */
public class Registration {
    private int REGISTER = 1;
    private int LOGIN = 2;
    private int action;
    private String email;
    private String authString;
    private String result;
    private Hibernate hibernate;

    public Registration(){
        if(hibernate == null){
            hibernate = new Hibernate();
        }
    }

    public String execute(){
        if(action == REGISTER)
            register();
        else if (action == LOGIN)
            login();
        return Action.SUCCESS;
    }

    private void register(){
        User newUser = new User(email, authString);
        try {
            hibernate.registerUser(newUser);
            result = "User registered!";
        } catch (UserExists userExists) {
            result = "Email already registered!";
        }
    }

    private void login(){
        User user = hibernate.logIn(email, authString);
        if(user == null){
            result = "Login failed";
        } else {
            result = "Login success";
        }
    }

    public void setAction(int action) {
        this.action = action;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAuthString(String authString) {
        this.authString = authString;
    }

    public String getResult() {
        return result;
    }
}
