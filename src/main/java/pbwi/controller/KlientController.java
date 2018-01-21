package pbwi.controller;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Bilet;
import pbwi.model.Klient;
import pbwi.model.Lot;

import javax.persistence.Query;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/klienci")
@RestController
public class KlientController extends AbstractController<Klient> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public KlientController() {
        super(Klient.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Klient> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Klient create(@RequestBody Klient klient) {
        return super.create(klient);
    }


    @RequestMapping(value = "/{id}/kupBilet", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Bilet createBilet(@RequestBody Lot lot, @PathVariable(value = "id") long id) {
        System.out.println(lot.getId_lotu() + " ");
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("Lot.findById", Lot.class);
        query.setParameter(1, lot.getId_lotu());
        Lot lot1 = (Lot) query.getSingleResult();
        Bilet result = new Bilet();

        Query query2 = session.createNamedQuery("Klient.findById", Klient.class);
        query2.setParameter(1, id);
        Klient klient = (Klient) query2.getSingleResult();
        if (lot1.getIloscMiejsc() > 0) {
            result.setNr_miejsca(lot1.getIloscMiejsc());
            lot1.setIloscMiejsc(lot1.getIloscMiejsc() - 1);
            result.setKlasa(lot.getKlasa());
            result.setLot(lot1);
            result.setDataLotu(lot1.getDataLotu());
            session.save(result);
            session.update(lot1);
            klient.addBilet(result);
            session.update(klient);
            session.getTransaction().commit();
        } else
            return null;

        session.close();

        return result;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Klient find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/bilety", method = RequestMethod.GET)
    public Set<Bilet> findTickets(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        Klient klient = session.find(Klient.class, id);
        Hibernate.initialize(klient.getBilety());
        session.close();
        Set<Bilet> bilety = klient.getBilety();
        return bilety;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Klient delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Klient klient) {
        super.update(klient);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
