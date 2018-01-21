package pbwi.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Data_lotu;
import pbwi.model.Lot;

import javax.persistence.Query;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/loty")
@RestController
public class LotController extends AbstractController<Lot> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public LotController() {
        super(Lot.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Lot> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Lot create(@RequestBody Lot lot) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Data_lotu dataLotu = lot.getDataLotu();
        session.save(dataLotu);
        lot.setDataLotu(dataLotu);
        session.getTransaction().commit();
        session.close();
        return super.create(lot);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Lot find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/pilot/{id}", method = RequestMethod.GET)
    public List<Lot> findPilots(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("Lot.findByIdPilota", Lot.class);
        query.setParameter(1, id);
        List<Lot> list = null;
        list = (List<Lot>) query.getResultList();
        session.close();
        return list;


    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Lot delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Lot lot) {
        super.update(lot);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
