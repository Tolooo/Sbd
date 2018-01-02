package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Pilot.findAll", query = "SELECT p FROM Pilot p")
        , @NamedQuery(name = "Pilot.findById", query = "SELECT p FROM Pilot p WHERE p.id_pilota = ?1")})
public class Pilot implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_pilota;

    private String imie;

    private String nazwisko;

    public Pilot() {
    }

    public long getId_pilota() {
        return id_pilota;
    }

    public void setId_pilota(long id_pilota) {
        this.id_pilota = id_pilota;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }
}
