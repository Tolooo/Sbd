package pbwi.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import javax.persistence.Query;
import java.util.List;

public abstract class AbstractController<T> {

    private Class<T> entityClass;

    public AbstractController(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    protected abstract SessionFactory getSessionFactory();

    public T create(T entity) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        session.save(entity);
        session.getTransaction().commit();
        return entity;
    }

    public void update(T entity) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        session.update(entity);
        session.getTransaction().commit();
    }

    public T delete(Object id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery(entityClass.getSimpleName() + ".findById", entityClass);
        query.setParameter(1,id);
        T entity=(T)query.getSingleResult();
        session.delete(entity);
        session.getTransaction().commit();
        return entity;
    }

    public T find(Object id) {
        Session session = getSessionFactory().openSession();
        return session.find(entityClass, id);
    }

    public List<T> findAll() {
        Session session = getSessionFactory().openSession();
        Query query = session.createNamedQuery(entityClass.getSimpleName() + ".findAll", entityClass);
        return query.getResultList();
    }

}
