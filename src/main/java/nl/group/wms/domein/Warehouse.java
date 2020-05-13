package nl.group.wms.domein;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int boxesHigh;
    private int boxesWide;
    private int boxesLong;
    @OneToMany
    private List<Box> boxList;

    public Warehouse(int boxesHigh, int boxesLong, int boxesWide){
        this.boxesHigh = boxesHigh;
        this.boxesLong = boxesLong;
        this.boxesWide = boxesWide;
        this.boxList = Arrays.asList(new Box[boxesHigh*boxesLong*boxesWide]);
    }

    public List<Box> getBoxList() {
        return boxList;
    }
}
