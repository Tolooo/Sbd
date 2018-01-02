package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Bilet;
import pbwi.model.Klient;

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

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Klient find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/bilety", method = RequestMethod.GET)
    public Set<Bilet> findTickets(@PathVariable("id") long id) {
        return super.find(id).getBilety();
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
