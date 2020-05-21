package nl.group.wms.domein;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;

@Entity
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    public enum status {RECEIVED,SEND};
    private HashMap<LocalDateTime, Enum<status>> statusMap = new HashMap<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public HashMap<LocalDateTime, Enum<status>> getStatusMap() {
        return statusMap;
    }

    public void setStatusMap(HashMap<LocalDateTime, Enum<status>> statusMap) {
        this.statusMap = statusMap;
    }

    public void addStatusToMap(Enum status){
        statusMap.put(LocalDateTime.now(),status);
    }
}