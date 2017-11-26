import org.hibernate.SessionFactory;
import pbwi.HibernateUtil;

public class main {

    public static void main(String[] args) {
        //test connection
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
        sessionFactory.openSession();
        sessionFactory.close();
    }
}
