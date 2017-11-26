package pbwi;

/**
 * Hibernate Utility class with a convenient method to get Session Factory
 * object.
 *
 * @author Kamil
 */

import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HibernateUtil {

    private static final SessionFactory sessionFactory;
    private static final StandardServiceRegistry serviceRegistry;

    static {

        serviceRegistry = new StandardServiceRegistryBuilder().configure().build();
        try {
            // Create the SessionFactory from standard (hibernate.cfg.xml) 
            // config file.
            sessionFactory = new MetadataSources(serviceRegistry).buildMetadata().buildSessionFactory();
        } catch (Throwable ex) {
            // Log the exception.
            StandardServiceRegistryBuilder.destroy(serviceRegistry);
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
