package nl.group.wms.domein;

import javax.persistence.*;

@Entity
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Product Product;
    private int length;
    private int width;
    private int height;
    private int maxProductItems;
    private int maxWeight;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return Product;
    }

    public void setProduct(Product product) {
        Product = product;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getMaxProductItems() {
        return maxProductItems;
    }

    public void setMaxProductItems(int maxProductItems) {
        this.maxProductItems = maxProductItems;
    }

    public int getMaxWeight() {
        return maxWeight;
    }

    public void setMaxWeight(int maxWeight) {
        this.maxWeight = maxWeight;
    }


}
