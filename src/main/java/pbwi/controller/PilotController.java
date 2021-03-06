package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Pilot;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/piloci")
@RestController
public class PilotController extends AbstractController<Pilot> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public PilotController() {
        super(Pilot.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Pilot> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Pilot create(@RequestBody Pilot pilot) {
        return super.create(pilot);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pilot find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Pilot delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Pilot pilot) {
        super.update(pilot);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
