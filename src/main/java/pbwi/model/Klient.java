package pbwi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQueries({
        @NamedQuery(name = "Klient.findAll", query = "SELECT k FROM Klient k")
        , @NamedQuery(name = "Klient.findById", query = "SELECT k FROM Klient k WHERE k.id_klienta = ?1")})
public class Klient implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_klienta;

    private String imie;

    private String nazwisko;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "Bilet_Klient", joinColumns = {
            @JoinColumn(name = "id_klienta", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "id_biletu",
                    nullable = false, updatable = false)})
    private Set<Bilet> bilety = new HashSet<Bilet>(0);

    public Klient() {
    }

    public long getId_klienta() {
        return id_klienta;
    }

    public void setId_klienta(long id_klienta) {
        this.id_klienta = id_klienta;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public Set<Bilet> getBilety() {
        return bilety;
    }

    public void setBilety(Set<Bilet> bilety) {
        this.bilety = bilety;
    }

    public void addBilet(Bilet bilet) {
        this.bilety.add( bilet);
    }
}
