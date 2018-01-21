package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Bilet.findAll", query = "SELECT b FROM Bilet b")
        , @NamedQuery(name = "Bilet.findById", query = "SELECT b FROM Bilet b WHERE b.id_biletu = ?1")})
public class Bilet implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_biletu;

    private String klasa;

    private long nr_miejsca;

    @OneToOne()
    @JoinColumn(name = "ID_LOTU")
    private Lot lot;


    @OneToOne()
    @JoinColumn(name = "ID_DATY")
    private Data_lotu dataLotu;

    public Bilet() {
    }

    public long getId_biletu() {
        return id_biletu;
    }

    public void setId_biletu(long id_biletu) {
        this.id_biletu = id_biletu;
    }

    public String getKlasa() {
        return klasa;
    }

    public void setKlasa(String klasa) {
        this.klasa = klasa;
    }

    public long getNr_miejsca() {
        return nr_miejsca;
    }

    public void setNr_miejsca(long nr_miejsca) {
        this.nr_miejsca = nr_miejsca;
    }

    public Lot getLot() {
        return lot;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }

    public Data_lotu getDataLotu() {
        return dataLotu;
    }

    public void setDataLotu(Data_lotu dataLotu) {
        this.dataLotu = dataLotu;
    }
}
