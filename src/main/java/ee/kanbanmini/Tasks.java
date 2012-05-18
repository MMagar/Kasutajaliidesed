package ee.kanbanmini;

import com.opensymphony.xwork2.Action;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Maks
 * Date: 16.05.12
 * Time: 22:18
 * To change this template use File | Settings | File Templates.
 */
public class Tasks {
    private long SAVE = -2;
    private long id;
    private String title;
    private long urgency;
    private long importance;
    private Date deadline;
    private String description;
    private long status;
    private Task currentTask;
    private static Hibernate hibernate;

    public Tasks(){
        if(hibernate == null){
            hibernate = new Hibernate();
        }
    }

    public String execute() {
        System.out.println("start2");
        if(id > -1) {
            currentTask = hibernate.getTask(id);
        } else if(id == SAVE) {
            Task newTask = new Task(title, urgency, importance, deadline, description, status);
            hibernate.saveTask(newTask);
            currentTask = currentTask;
        }
        return Action.SUCCESS;
    }

    public void setId(long id){
        this.id = id;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setUrgency(long urgency) {
        this.urgency = urgency;
    }

    public void setImportance(long importance) {
        this.importance = importance;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(long status) {
        this.status = status;
    }

    public long getId(){
        if(currentTask != null)
            return currentTask.getId();
        else return -1;
    }

    public String getTitle(){
        if(currentTask != null)
            return currentTask.getTitle();
        else
            return null;
    }

    public long getUrgency(){
        if(currentTask != null)
            return currentTask.getUrgency();
        else return -1;
    }

    public long getImportance(){
        if(currentTask != null)
            return currentTask.getImportance();
        else return -1;
    }

    public Date getDeadline(){
        if(currentTask != null)
            return currentTask.getDeadline();
        else return null;
    }

    public String getDescription(){
        if(currentTask != null)
            return currentTask.getDescription();
        else return null;
    }

    public long getStatus(){
        if(currentTask != null)
            return currentTask.getStatus();
        else return -1;
    }
}
