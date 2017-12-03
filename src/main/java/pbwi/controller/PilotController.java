package pbwi.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pbwi.HibernateUtil;
import pbwi.model.Pilot;

import javax.persistence.Query;
import java.util.List;

@RequestMapping("/Pilots")
@RestController
public class PilotController {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @RequestMapping(method = RequestMethod.GET)
    public List<Pilot> getPilots() {
        Session session = sessionFactory.openSession();
        Query query = session.createNamedQuery("Pilot.findAll", Pilot.class);
        return query.getResultList();
    }


}
