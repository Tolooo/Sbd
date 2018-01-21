package pbwi.controller;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Bilet;
import pbwi.model.Firma;
import pbwi.model.Lot;

import javax.persistence.Query;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/firmy")
@RestController
public class FirmaController extends AbstractController<Firma> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public FirmaController() {
        super(Firma.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Firma> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Firma create(@RequestBody Firma firma) {
        return super.create(firma);
    }

    @RequestMapping(value = "/{id}/kupBilet", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Bilet createBilet(@RequestBody Lot lot, @PathVariable(value = "id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("Lot.findById", Lot.class);
        query.setParameter(1, lot.getId_lotu());
        Lot lot1 = (Lot) query.getSingleResult();
        Bilet result = new Bilet();

        Query query2 = session.createNamedQuery("Firma.findById", Firma.class);
        query2.setParameter(1, id);
        Firma firma = (Firma) query2.getSingleResult();
        if (lot1.getIloscMiejsc() > 0) {
            result.setNr_miejsca(lot1.getIloscMiejsc());
            lot1.setIloscMiejsc(lot1.getIloscMiejsc() - 1);
            result.setKlasa(lot.getKlasa());
            result.setLot(lot1);
            result.setDataLotu(lot1.getDataLotu());
            session.save(result);
            session.update(lot1);
            firma.addBilet(result);
            session.update(firma);
            session.getTransaction().commit();
        } else
            return null;

        session.close();

        return result;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Firma find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/bilety", method = RequestMethod.GET)
    public Set<Bilet> findTickets(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        Firma firma = session.find(Firma.class, id);
        Hibernate.initialize(firma.getBilety());
        session.close();
        Set<Bilet> bilety = firma.getBilety();
        return bilety;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Firma delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Firma firma) {
        super.update(firma);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
