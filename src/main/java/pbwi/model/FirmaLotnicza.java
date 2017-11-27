package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class FirmaLotnicza implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_firmyLotniczej;

    private String Nazwa;

    private String Kraj;

    private long NIP;

    private String Adres;

    private String IATA;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "firmaLotnicza", cascade = CascadeType.ALL)//
    private Set<Samolot> samoloty = new HashSet<Samolot>(0);

    @ManyToMany(fetch = FetchType.LAZY)//
    @JoinTable(name = "FIRMA_LOTNISKO", joinColumns = {
            @JoinColumn(name = "ID_FIRMYLOTNICZEJ", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "ID_LOTNISKA",
                    nullable = false, updatable = false)})
    private Set<Lotnisko> lotniska = new HashSet<Lotnisko>(0);

    public FirmaLotnicza() {
    }

    public long getId_firmyLotniczej() {
        return id_firmyLotniczej;
    }

    public void setId_firmyLotniczej(long id_firmyLotniczej) {
        this.id_firmyLotniczej = id_firmyLotniczej;
    }

    public String getNazwa() {
        return Nazwa;
    }

    public void setNazwa(String nazwa) {
        Nazwa = nazwa;
    }

    public String getKraj() {
        return Kraj;
    }

    public void setKraj(String kraj) {
        Kraj = kraj;
    }

    public long getNIP() {
        return NIP;
    }

    public void setNIP(long NIP) {
        this.NIP = NIP;
    }

    public String getAdres() {
        return Adres;
    }

    public void setAdres(String adres) {
        Adres = adres;
    }

    public String getIATA() {
        return IATA;
    }

    public void setIATA(String IATA) {
        this.IATA = IATA;
    }

    public Set<Samolot> getSamoloty() {
        return samoloty;
    }

    public void setSamoloty(Set<Samolot> samoloty) {
        this.samoloty = samoloty;
    }

    public Set<Lotnisko> getLotniska() {
        return lotniska;
    }

    public void setLotniska(Set<Lotnisko> lotniska) {
        this.lotniska = lotniska;
    }
}
