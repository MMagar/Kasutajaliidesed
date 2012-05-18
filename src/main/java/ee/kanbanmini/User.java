package ee.kanbanmini;

/**
 * Created with IntelliJ IDEA.
 * User: Maks
 * Date: 14.05.12
 * Time: 22:18
 * To change this template use File | Settings | File Templates.
 */
public class User {
    private long id;
    private String email;
    private String authorizationString;

    public User(){
    }

    public User(String email, String authorizationString) {
        this.email = email;
        this.authorizationString = authorizationString;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthorizationString() {
        return authorizationString;
    }

    public void setAuthorizationString(String authorizationString) {
        this.authorizationString = authorizationString;
    }
}
