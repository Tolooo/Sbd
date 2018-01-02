package pbwi.controller;

import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pbwi.HibernateUtil;
import pbwi.model.FirmaLotnicza;
import pbwi.model.Lotnisko;
import pbwi.model.Samolot;

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
    @RequestMapping(value = "/{id}/lotniska", method = RequestMethod.GET)
    public Set<Lotnisko> findAirports(@PathVariable("id") long id) {
        return super.find(id).getLotniska();
    }
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}/samoloty", method = RequestMethod.GET)
    public Set<Samolot> findPlanes(@PathVariable("id") long id) {
        return super.find(id).getSamoloty();
    }
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public FirmaLotnicza delete(@PathVariable("id") long id) {
        return super.delete(id);
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@PathVariable("id") long id, @RequestBody FirmaLotnicza firmaLotnicza) {
        super.update(firmaLotnicza);
    }

    @Override
    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
