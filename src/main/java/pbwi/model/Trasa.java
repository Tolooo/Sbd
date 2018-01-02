package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Trasa.findAll", query = "SELECT t FROM Trasa t")
        , @NamedQuery(name = "Trasa.findById", query = "SELECT t FROM Trasa t WHERE t.id_trasy = ?1")})
public class Trasa implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_trasy;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "POCZATEK")
    private Lotnisko poczatek;


    public long getId_trasy() {
        return id_trasy;
    }

    public void setId_trasy(long id_trasy) {
        this.id_trasy = id_trasy;
    }

    public Lotnisko getPoczatek() {
        return poczatek;
    }

    public void setPoczatek(Lotnisko poczatek) {
        this.poczatek = poczatek;
    }
}
