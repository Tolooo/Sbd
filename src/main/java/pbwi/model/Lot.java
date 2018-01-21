package pbwi.model;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Lot.findAll", query = "SELECT l FROM Lot l")
        , @NamedQuery(name = "Lot.findById", query = "SELECT l FROM Lot l WHERE l.id_lotu = ?1")
        , @NamedQuery(name = "Lot.findByIdFirmyLotniczej", query = "SELECT l FROM Lot l WHERE l.samolot.firmaLotnicza.id_firmyLotniczej = ?1")
        , @NamedQuery(name = "Lot.findByIdPilota", query = "SELECT l FROM Lot l WHERE l.pilot.id_pilota = ?1")})
public class Lot implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_lotu;


    @OneToOne()
    @JoinColumn(name = "ID_SAMOLOTU")
    private Samolot samolot;

    private String klasa;

    private int iloscMiejsc;

    @OneToOne()
    @JoinColumn(name = "ID_PILOTA")
    private Pilot pilot;

    @OneToOne()
    @JoinColumn(name = "ID_TRASY")
    private Trasa trasa;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_DATY")
    private Data_lotu dataLotu;

    public Lot() {
    }

    public long getId_lotu() {
        return id_lotu;
    }

    public void setId_lotu(long id_lotu) {
        this.id_lotu = id_lotu;
    }

    public Samolot getSamolot() {
        return samolot;
    }

    public void setSamolot(Samolot samolot) {
        this.samolot = samolot;
    }

    public Pilot getPilot() {
        return pilot;
    }

    public void setPilot(Pilot pilot) {
        this.pilot = pilot;
    }

    public Trasa getTrasa() {
        return trasa;
    }

    public void setTrasa(Trasa trasa) {
        this.trasa = trasa;
    }

    public Data_lotu getDataLotu() {
        return dataLotu;
    }

    public void setDataLotu(Data_lotu dataLotu) {
        this.dataLotu = dataLotu;
    }


    public String getKlasa() {
        return klasa;
    }

    public void setKlasa(String klasa) {
        this.klasa = klasa;
    }

    public int getIloscMiejsc() {
        return iloscMiejsc;
    }

    public void setIloscMiejsc(int iloscMiejsc) {
        this.iloscMiejsc = iloscMiejsc;
    }
}
