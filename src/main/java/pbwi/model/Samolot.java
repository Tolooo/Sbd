package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Samolot.findAll", query = "SELECT s FROM Samolot s")
        , @NamedQuery(name = "Samolot.findById", query = "SELECT s FROM Samolot s WHERE s.id_samolotu = ?1")})
public class Samolot implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_samolotu;

    private String typ;

    private long iloscMiejsc;

    @ManyToOne()
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
        return typ;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }

    public long getIloscMiejsc() {
        return iloscMiejsc;
    }

    public void setIloscMiejsc(long iloscMiejsc) {
        this.iloscMiejsc = iloscMiejsc;
    }

    public FirmaLotnicza getFirmaLotnicza() {
        return firmaLotnicza;
    }

    public void setFirmaLotnicza(FirmaLotnicza firmaLotnicza) {
        this.firmaLotnicza = firmaLotnicza;
    }
}
