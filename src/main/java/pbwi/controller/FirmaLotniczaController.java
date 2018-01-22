package pbwi.controller;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.*;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/firmyLotnicze")
@RestController
public class FirmaLotniczaController extends AbstractController<FirmaLotnicza> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public FirmaLotniczaController() {
        super(FirmaLotnicza.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<FirmaLotnicza> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public FirmaLotnicza create(@RequestBody FirmaLotnicza firmaLotnicza) {
        return super.create(firmaLotnicza);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public FirmaLotnicza find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/loty", method = RequestMethod.GET)
    public List<Lot> findLoty(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        Query query = session.createNamedQuery("Lot.findByIdFirmyLotniczej", Lot.class);
        query.setParameter(1, id);
        List<Lot> list = null;
        list = (List<Lot>) query.getResultList();
        session.close();
        return list;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/trasy", method = RequestMethod.GET)
    public List<Trasa> findTrasy(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        session.beginTransaction();
        FirmaLotnicza firmaLotnicza = super.find(id);
        Query query = session.createNamedQuery("Trasa.findAll", Trasa.class);
        List<Trasa> trasy = null;
        List<Trasa> list = new ArrayList();
        trasy = (List<Trasa>) query.getResultList();
        for (Trasa trasa : trasy) {
            for (FirmaLotnicza lotnicza : trasa.getPoczatek().getFirmyLotnicze()) {
                if (firmaLotnicza.getId_firmyLotniczej() == (lotnicza.getId_firmyLotniczej())) {
                    list.add(trasa);
                    break;
                }
            }
            for (FirmaLotnicza lotnicza : trasa.getKoniec().getFirmyLotnicze()) {
                if (firmaLotnicza.getId_firmyLotniczej() == (lotnicza.getId_firmyLotniczej()) && !list.contains(trasa)) {
                    list.add(trasa);
                    break;
                }
            }

        }
        session.close();
        return list;
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/lotniska", method = RequestMethod.GET)
    public Set<Lotnisko> findAirports(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        FirmaLotnicza firmaLotnicza = session.find(FirmaLotnicza.class, id);
        Hibernate.initialize(firmaLotnicza.getLotniska());
        session.close();
        Set<Lotnisko> lotniska = firmaLotnicza.getLotniska();
        return lotniska;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/samoloty", method = RequestMethod.GET)
    public Set<Samolot> findPlanes(@PathVariable("id") long id) {
        Session session = getSessionFactory().openSession();
        FirmaLotnicza firmaLotnicza = session.find(FirmaLotnicza.class, id);
        Hibernate.initialize(firmaLotnicza.getSamoloty());
        session.close();
        Set<Samolot> samoloty = firmaLotnicza.getSamoloty();
        return samoloty;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public FirmaLotnicza delete(@PathVariable("id") long id) {
        return super.delete(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody FirmaLotnicza firmaLotnicza) {
        FirmaLotnicza firmaToUpdate = super.find(firmaLotnicza.getId_firmyLotniczej());
        firmaToUpdate.setIATA(firmaLotnicza.getIATA());
        firmaToUpdate.setNIP(firmaLotnicza.getNIP());
        firmaToUpdate.setNazwa(firmaLotnicza.getNazwa());
        firmaToUpdate.setAdres(firmaLotnicza.getAdres());
        firmaToUpdate.setKraj(firmaLotnicza.getKraj());
        super.update(firmaToUpdate);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
