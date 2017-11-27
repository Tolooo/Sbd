package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Samolot implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_samolotu;

    private String Typ;

    private long IloscMiejsc;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_FIRMYLOTNICZEJ")
    private FirmaLotnicza firmaLotnicza;

    public Samolot() {
    }

    public long getId_samolotu() {
        return id_samolotu;
    }

    public void setId_samolotu(long id_samolotu) {
        this.id_samolotu = id_samolotu;
    }

    public String getTyp() {
        return Typ;
    }

    public void setTyp(String typ) {
        Typ = typ;
    }

    public long getIloscMiejsc() {
        return IloscMiejsc;
    }

    public void setIloscMiejsc(long iloscMiejsc) {
        IloscMiejsc = iloscMiejsc;
    }

    public FirmaLotnicza getFirmaLotnicza() {
        return firmaLotnicza;
    }

    public void setFirmaLotnicza(FirmaLotnicza firmaLotnicza) {
        this.firmaLotnicza = firmaLotnicza;
    }
}
