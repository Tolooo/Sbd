package pbwi.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Bilet;
import pbwi.model.Firma;

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

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Firma find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/bilety", method = RequestMethod.GET)
    public Set<Bilet> findTickets(@PathVariable("id") long id) {
        return super.find(id).getBilety();
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
