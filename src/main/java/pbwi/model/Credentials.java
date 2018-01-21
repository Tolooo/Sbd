package pbwi.model;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Credentials.findAll", query = "SELECT c FROM Credentials c")
        , @NamedQuery(name = "Credentials.findById", query = "SELECT c FROM Credentials c WHERE c.user_id = ?1")
        , @NamedQuery(name = "Credentials.findByLoginAndPassword", query = "SELECT c FROM Credentials c WHERE c.user_name = ?1 and c.user_password=?2")})
public class Credentials implements Serializable {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private long user_id;

    private String user_name;

    private String user_password;

    private String user_role;

    private long user_role_id;

    public Credentials() {
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public long getUser_role_id() {
        return user_role_id;
    }

    public void setUser_role_id(long user_role_id) {
        this.user_role_id = user_role_id;
    }
}
