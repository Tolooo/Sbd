package pbwi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQueries({
        @NamedQuery(name = "Firma.findAll", query = "SELECT f FROM Firma f")
        , @NamedQuery(name = "Firma.findById", query = "SELECT f FROM Firma f WHERE f.id_firmy = ?1")})
public class Firma implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_firmy;

    private String nazwa;

    private long NIP;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
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
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
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
