package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Trasa implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_trasy;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "POCZATEK")
    private Lotnisko Poczatek;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "KONIEC")

    private Lotnisko Koniec;

    public Trasa() {
    }

    public long getId_trasy() {
        return id_trasy;
    }

    public void setId_trasy(long id_trasy) {
        this.id_trasy = id_trasy;
    }

    public Lotnisko getPoczatek() {
        return Poczatek;
    }

    public void setPoczatek(Lotnisko poczatek) {
        Poczatek = poczatek;
    }

    public Lotnisko getKoniec() {
        return Koniec;
    }

    public void setKoniec(Lotnisko koniec) {
        Koniec = koniec;
    }
}
