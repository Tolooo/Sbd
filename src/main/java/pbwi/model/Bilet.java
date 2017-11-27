package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Bilet implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_biletu;

    private String Klasa;

    private long Nr_miejsca;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_LOTU")
    private Lot lot;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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
        return Klasa;
    }

    public void setKlasa(String klasa) {
        Klasa = klasa;
    }

    public long getNr_miejsca() {
        return Nr_miejsca;
    }

    public void setNr_miejsca(long nr_miejsca) {
        Nr_miejsca = nr_miejsca;
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
