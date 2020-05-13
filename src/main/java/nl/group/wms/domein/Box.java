package nl.group.wms.domein;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String location; //output: l1b5h3

    public long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
