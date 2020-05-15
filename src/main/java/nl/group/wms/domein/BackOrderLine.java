package nl.group.wms.domein;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class BackOrderLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	private BackOrder backOrder;
	private String product;
	private int amount;
	
	public long getId() {
		return id;
	}
	public BackOrder getBackOrder() {
		return backOrder;
	}
	public void setBackOrder(BackOrder backOrder) {
		this.backOrder = backOrder;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
}
