package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Firma implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_firmy;

    private String Nazwa;

    private long NIP;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "Bilet_Firma", joinColumns = {
            @JoinColumn(name = "id_firmy", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "id_biletu",
                    nullable = false, updatable = false)})
    private Set<Bilet> bilety = new HashSet<Bilet>(0);

    public Firma() {
    }

    public long getId_firmy() {
        return id_firmy;
    }

    public void setId_firmy(long id_firmy) {
        this.id_firmy = id_firmy;
    }

    public String getNazwa() {
        return Nazwa;
    }

    public void setNazwa(String nazwa) {
        Nazwa = nazwa;
    }

    public long getNIP() {
        return NIP;
    }

    public void setNIP(long NIP) {
        this.NIP = NIP;
    }

    public Set<Bilet> getBilety() {
        return bilety;
    }

    public void setBilety(Set<Bilet> bilety) {
        this.bilety = bilety;
    }
}
