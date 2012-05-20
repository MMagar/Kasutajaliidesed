package ee.kanbanmini;

import com.opensymphony.xwork2.Action;
import org.hibernate.Query;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

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
    private List<Long> taskIds = new ArrayList<Long>();

    public Registration(){
        if(hibernate == null){
            hibernate = new Hibernate();
        }
    }

    public String register(){
        System.out.println("Should reg " + email + " : " + authString);
        Session session = hibernate.sessionFactory.openSession();

        Query query = session.getNamedQuery("findUserByAuthAndEmail");
        query.setString("email", email);
        query.setString("auth", authString);
        if(!query.list().isEmpty()){
            result = "Email already registered!";
            session.close();
            return Action.SUCCESS;
        }

        User newUser = new User(email, authString);
        session.beginTransaction();
        session.save(newUser);
        session.getTransaction().commit();
        session.close();

        result = "User registered!";
        return Action.SUCCESS;
    }


    public String login(){
        Session session = hibernate.sessionFactory.openSession();
        Query query = session.getNamedQuery("findUserByAuthAndEmail");
        query.setString("email", email);
        query.setString("auth", authString);
        if(!query.list().isEmpty()) {
            result = "Login success";
        } else {
            result = "Login failed";
        }
        session.close();
        return Action.SUCCESS;
    }

    public String getTasks(){
        Session session = hibernate.sessionFactory.openSession();

        Query query = session.getNamedQuery("findUserByAuth");
        query.setString("auth", authString);
        if(!query.list().isEmpty()){
            User user = (User)query.list().get(0);
            taskIds = user.getTaskIds();
        }
        session.close();
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

    public List<Long> getTaskIds() {
        return taskIds;
    }

}
