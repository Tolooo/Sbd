package pbwi.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Credentials;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.List;


@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/users")
@RestController
public class CredentialsController extends  AbstractController<Credentials> {

    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public CredentialsController() {
        super(Credentials.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Credentials> findAll() {
        return super.findAll();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value ="/register",method = RequestMethod.POST)
    public Credentials create(@RequestBody Credentials credentials) {
        return super.create(credentials);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Credentials login(@RequestBody Credentials credentials) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery(    "Credentials.findByLoginAndPassword", Credentials.class);
        query.setParameter(1,credentials.getUser_name());
        query.setParameter(2,credentials.getUser_password());
        Credentials entity=null;
        try{
          entity=(Credentials)query.getSingleResult();}
        catch (NoResultException nre){
            }
        session.close();
        return entity;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Credentials find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Credentials delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Credentials credentials) {
        super.update(credentials);
    }


    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
