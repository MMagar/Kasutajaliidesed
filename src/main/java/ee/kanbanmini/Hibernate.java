package ee.kanbanmini;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Created with IntelliJ IDEA.
 * User: Maks
 * Date: 16.05.12
 * Time: 23:15
 * To change this template use File | Settings | File Templates.
 */
public class Hibernate {
    SessionFactory sessionFactory;

    public Hibernate(){
        sessionFactory = new Configuration().configure().buildSessionFactory();
    }

    public long[] getTasIdsOfUser(){
        return new long[]{1, 2, 3};
    }

    public Task getTask(long id){
        Task result;
        Session session = getSession();
        result = (Task)session.get(Task.class, id);
        session.close();
        return result;
    }

    public void updateTask(Task task){
        Session session = getSession();
        session.beginTransaction();
        session.update(task);
        session.getTransaction().commit();
        session.close();
    }

    public void registerUser(User user) throws UserExists {
        if(findUser(user.getEmail()) != null){
            throw new UserExists();
        }
        Session session = getSession();
        session.beginTransaction();
        session.save(user);
        session.getTransaction().commit();
        session.close();
    }

    public User findUser(String email){
        User result = null;
        Session session = getSession();
        Query query = session.getNamedQuery("findUserByEmail");
        query.setString("email", email);
        if(!query.list().isEmpty())
            result = (User)query.list().get(0);
        session.close();
        return result;
    }

    public User findUserByAuth(String auth){
        User result = null;
        Session session = getSession();
        Query query = session.getNamedQuery("findUserByAuth");
        query.setString("auth", auth);
        if(!query.list().isEmpty())
            result = (User)query.list().get(0);
        session.close();
        return result;
    }

    public void updateUser(User user) {
        Session session = getSession();
        session.beginTransaction();
        session.update(user);
        session.getTransaction().commit();
        session.close();
    }

    public User logIn(String email, String authorization){
        User result = null;
        Session session = getSession();
        Query query = session.getNamedQuery("findUserByAuthAndEmail");
        query.setString("email", email);
        query.setString("auth", authorization);
        if(!query.list().isEmpty())
            result = (User)query.list().get(0);
        session.close();
        return result;
    }

    private Session getSession(){
        if(sessionFactory.getCurrentSession().isOpen()){
            return sessionFactory.openSession();
        }
        return sessionFactory.getCurrentSession();
    }

}
