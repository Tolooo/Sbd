package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.FirmaLotnicza;
import pbwi.model.Lot;
import pbwi.model.Lotnisko;

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

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Lotnisko find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/firmyLotnicze", method = RequestMethod.GET)
    public Set<FirmaLotnicza> findAirlines(@PathVariable("id") long id) {
        return super.find(id).getFirmyLotnicze();
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
