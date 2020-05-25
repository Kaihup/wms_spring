package nl.group.wms.domein;

import javax.persistence.*;

@Entity
public class CustomerOrderLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int amount;
    private int price;
    @ManyToOne
    private Product product;
    @ManyToOne
    private CustomerOrder customerOrder;

    public CustomerOrder getCustomerOrder() {
        return customerOrder;
    }

    public void setCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrder = customerOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\n----line id: " + id);
        sb.append("\n\t\tamount: " + amount);
        sb.append("\n\t\tprice: " + price);
        sb.append("\n\t\tproductId: " + product.getName());
        sb.append("\n\t\tcustomerOrderId: " + customerOrder.getId());
        return sb.toString();
    }
}