package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Samolot;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/samoloty")
@RestController
public class SamolotController extends AbstractController<Samolot> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public SamolotController() {
        super(Samolot.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Samolot> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Samolot create(@RequestBody Samolot samolot) {
        return super.create(samolot);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Samolot find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Samolot delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Samolot samolot) {
        super.update(samolot);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
