package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Samolot;
import pbwi.model.Trasa;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/trasy")
@RestController
public class TrasaController extends AbstractController<Trasa> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public TrasaController() {
        super(Trasa.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Trasa> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Trasa create(@RequestBody Trasa trasa) {
        return super.create(trasa);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Trasa find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Trasa delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Trasa trasa) {
        super.update(trasa);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
