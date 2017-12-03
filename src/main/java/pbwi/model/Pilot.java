package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Pilot.findAll", query = "SELECT p FROM Pilot p")
        , @NamedQuery(name = "Pilot.findByIdPilota", query = "SELECT p FROM Pilot p WHERE p.id_pilota = :idPilota")
        , @NamedQuery(name = "Pilot.findByImie", query = "SELECT p FROM Pilot p WHERE p.Imie = :imie")
        , @NamedQuery(name = "Pilot.findByNazwisko", query = "SELECT p FROM Pilot p WHERE p.Nazwisko = :nazwisko")})
public class Pilot implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_pilota;

    private String Imie;

    private String Nazwisko;

    public Pilot() {
    }

    public long getId_pilota() {
        return id_pilota;
    }

    public void setId_pilota(long id_pilota) {
        this.id_pilota = id_pilota;
    }

    public String getImie() {
        return Imie;
    }

    public void setImie(String imie) {
        Imie = imie;
    }

    public String getNazwisko() {
        return Nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        Nazwisko = nazwisko;
    }
}
