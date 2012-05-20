package ee.kanbanmini;


import java.util.HashSet;
import java.util.Set;

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
    private Set<Task> tasks = new HashSet<Task>(0);

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

    public Set getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTask(Task task){
        tasks.add(task);
    }

    public long[] getTaskIds(){
        long[] result = {};
        int i = 0;
        for(Task task : tasks){
            result[i] = task.getId();
            i++;
        }
        return result;
    }
}
