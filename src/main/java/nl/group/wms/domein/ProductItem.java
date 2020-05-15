package nl.group.wms.domein;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;

@Entity
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    public enum status {CHECKED_IN,IN_STORAGE,RESERVED,READY_FOR_TRANSIT,CHECKED_OUT};
    @ManyToOne
    private Product product;
    @ManyToOne
    private Box box;

    private HashMap<LocalDateTime, Enum<status>> statusMap = new HashMap<>();

    public void addStatusToMap(Enum status){
        statusMap.put(LocalDateTime.now(),status);
    }

    public long getId() {
        return id;
    }

    public HashMap<LocalDateTime, Enum<status>> getStatusMap() {
        return statusMap;
    }

    public void setStatusMap(HashMap<LocalDateTime, Enum<status>> statusMap) {
        this.statusMap = statusMap;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


}
