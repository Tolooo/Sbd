package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@NamedQueries({
        @NamedQuery(name = "Data_lotu.findAll", query = "SELECT d FROM Data_lotu d")
        , @NamedQuery(name = "Data_lotu.findById", query = "SELECT d FROM Data_lotu d WHERE d.id_daty = ?1")})
public class Data_lotu implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_daty;

    private Date wylot;

    private Date przylot;

    public Data_lotu() {
    }

    public long getId_daty() {
        return id_daty;
    }

    public void setId_daty(long id_daty) {
        this.id_daty = id_daty;
    }

    public Date getWylot() {
        return wylot;
    }

    public void setWylot(Date wylot) {
        this.wylot = wylot;
    }

    public Date getPrzylot() {
        return przylot;
    }

    public void setPrzylot(Date przylot) {
        this.przylot = przylot;
    }
}
