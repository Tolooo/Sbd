package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Bilet;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/bilety")
@RestController
public class BiletController extends AbstractController<Bilet> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public BiletController() {
        super(Bilet.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Bilet> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Bilet create(@RequestBody Bilet bilet) {
        return super.create(bilet);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Bilet find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Bilet delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Bilet bilet) {
        super.update(bilet);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
