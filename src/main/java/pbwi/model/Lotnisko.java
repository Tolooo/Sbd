package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Lotnisko implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_lotniska;

    private String Miejscowosc;

    private String IATA;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "lotniska")//
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
        return Miejscowosc;
    }

    public void setMiejscowosc(String miejscowosc) {
        Miejscowosc = miejscowosc;
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
}
