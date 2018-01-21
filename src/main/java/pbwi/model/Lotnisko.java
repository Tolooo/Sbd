package pbwi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQueries({
        @NamedQuery(name = "Lotnisko.findAll", query = "SELECT l FROM Lotnisko l")
        , @NamedQuery(name = "Lotnisko.findById", query = "SELECT l FROM Lotnisko l WHERE l.id_lotniska = ?1")})
public class Lotnisko implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_lotniska;

    private String miejscowosc;

    private String IATA;

    @JsonIgnore
    @ManyToMany(mappedBy = "lotniska")
    private Set<FirmaLotnicza> firmyLotnicze = new HashSet<FirmaLotnicza>(0);

    public Lotnisko() {
    }

    public long getId_lotniska() {
        return id_lotniska;
    }

    public void setId_lotniska(long id_lotniska) {
        this.id_lotniska = id_lotniska;
    }

    public String getMiejscowosc() {
        return miejscowosc;
    }

    public void setMiejscowosc(String miejscowosc) {
        this.miejscowosc = miejscowosc;
    }

    public String getIATA() {
        return IATA;
    }

    public void setIATA(String IATA) {
        this.IATA = IATA;
    }

    public Set<FirmaLotnicza> getFirmyLotnicze() {
        return firmyLotnicze;
    }

    public void setFirmyLotnicze(Set<FirmaLotnicza> firmyLotnicze) {
        this.firmyLotnicze = firmyLotnicze;
    }

    public void addFirmaLotnicza(FirmaLotnicza firmaLotnicza) {
        this.firmyLotnicze.add(firmaLotnicza);
    }

    public void removeFirmaLotnicza(FirmaLotnicza firmaLotnicza) {
        this.firmyLotnicze.remove(firmaLotnicza);
    }
}
