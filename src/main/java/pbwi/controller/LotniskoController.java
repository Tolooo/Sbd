package pbwi.controller;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.FirmaLotnicza;
import pbwi.model.Lot;
import pbwi.model.Lotnisko;

import javax.persistence.Query;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/lotniska")
@RestController
public class LotniskoController extends AbstractController<Lotnisko> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public LotniskoController() {
        super(Lotnisko.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Lotnisko> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Lotnisko create(@RequestBody Lotnisko lotnisko) {
        return super.create(lotnisko);
    }

    @RequestMapping(value = "/firmyLotnicze/{id}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Lotnisko createAndAdd(@RequestBody Lotnisko lotnisko, @PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("FirmaLotnicza.findById", FirmaLotnicza.class);
        query.setParameter(1, id);
        FirmaLotnicza firmaLotnicza = (FirmaLotnicza) query.getSingleResult();
        lotnisko.addFirmaLotnicza(firmaLotnicza);
        session.save(lotnisko);
        if (lotnisko != null)
            firmaLotnicza.addLotnisko(lotnisko);
        session.update(firmaLotnicza);
        session.getTransaction().commit();
        session.close();
        return lotnisko;
    }

    @RequestMapping(value = "/{idLotniska}/firmyLotnicze/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public Lotnisko remove(@PathVariable("idLotniska") long idLotniska, @PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("FirmaLotnicza.findById", FirmaLotnicza.class);
        query.setParameter(1, id);
        FirmaLotnicza firmaLotnicza = (FirmaLotnicza) query.getSingleResult();
        Query query2 = session.createNamedQuery("Lotnisko.findById", Lotnisko.class);
        query2.setParameter(1, idLotniska);
        Lotnisko lotnisko = (Lotnisko) query2.getSingleResult();
        lotnisko.removeFirmaLotnicza(firmaLotnicza);
        session.save(lotnisko);
        if (lotnisko != null)
            firmaLotnicza.removeLotnisko(lotnisko);
        session.update(firmaLotnicza);
        session.getTransaction().commit();
        session.close();
        return lotnisko;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Lotnisko find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/firmyLotnicze", method = RequestMethod.GET)
    public Set<FirmaLotnicza> findAirlines(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        Lotnisko entity = session.find(Lotnisko.class, id);
        Set<FirmaLotnicza> firmy = entity.getFirmyLotnicze();
        Hibernate.initialize(firmy);
        session.close();
        return firmy;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Lotnisko delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Lotnisko lotnisko) {
        super.update(lotnisko);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
