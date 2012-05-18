package ee.kanbanmini;

import java.io.Serializable;
import java.util.Date;

public class Task implements Serializable {
    private long id;
    private String title;
    private long urgency;
    private long importance;
    private Date deadline;
    private String description;
    private long status;

    public Task() {
    }

    public Task(String title, long urgency, long importance, Date deadline, String description, long status) {
        this.title = title;
        this.urgency = urgency;
        this.importance = importance;
        this.deadline = deadline;
        this.description = description;
        this.status = status;
    }

    public Task(long id, String title, long urgency, long importance, Date deadline, String description, long status) {
        this.id = id;
        this.title = title;
        this.urgency = urgency;
        this.importance = importance;
        this.deadline = deadline;
        this.description = description;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getUrgency() {
        return urgency;
    }

    public void setUrgency(long urgency) {
        this.urgency = urgency;
    }

    public long getImportance() {
        return importance;
    }

    public void setImportance(int importance) {
        this.importance = importance;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
