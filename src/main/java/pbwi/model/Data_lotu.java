package pbwi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Data_lotu implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long id_daty;

    private Date Wylot;

    private Date Przylot;

    public Data_lotu() {
    }

    public long getId_daty() {
        return id_daty;
    }

    public void setId_daty(long id_daty) {
        this.id_daty = id_daty;
    }

    public Date getWylot() {
        return Wylot;
    }

    public void setWylot(Date wylot) {
        Wylot = wylot;
    }

    public Date getPrzylot() {
        return Przylot;
    }

    public void setPrzylot(Date przylot) {
        Przylot = przylot;
    }
}
