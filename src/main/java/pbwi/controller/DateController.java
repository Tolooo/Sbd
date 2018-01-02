package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.Data_lotu;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/daty")
@RestController
public class DateController extends AbstractController<Data_lotu> {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public DateController() {
        super(Data_lotu.class);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Data_lotu> findAll() {
        return super.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public Data_lotu create(@RequestBody Data_lotu dataLotu) {
        return super.create(dataLotu);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Data_lotu find(@PathVariable("id") long id) {
        return super.find(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Data_lotu delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody Data_lotu dataLotu) {
        super.update(dataLotu);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
