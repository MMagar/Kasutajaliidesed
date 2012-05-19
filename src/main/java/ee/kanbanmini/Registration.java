package ee.kanbanmini;

import com.opensymphony.xwork2.Action;
import org.apache.log4j.helpers.LogLog;

/**
 * Created with IntelliJ IDEA.
 * User: Maks
 * Date: 17.05.12
 * Time: 22:19
 * To change this template use File | Settings | File Templates.
 */
public class Registration {
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
        LogLog.warn("WARN exec");
        return Action.SUCCESS;
    }

    public String register(){
        LogLog.warn("WARN reg");

        System.out.println("Should reg" + email + " : " + authString);
        User newUser = new User(email, authString);
        try {
            hibernate.registerUser(newUser);
            result = "User registered!";
        } catch (UserExists userExists) {
            result = "Email already registered!";
        }
        return Action.SUCCESS;
    }

    public String login(){
        LogLog.warn("WARN login");
        User user = hibernate.logIn(email, authString);
        if(user == null){
            result = "Login failed";
        } else {
            result = "Login success";
        }
        return Action.SUCCESS;
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
