package nl.group.wms.domein;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import nl.group.wms.domein.ProductItem.status;

@Entity
public class BackOrderDelivery {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private int member;
	private boolean complete;
	private LocalDate deliveryDate;
	private String licensePlateDeliverer;
	private boolean deviating;
	public enum status {ARRIVED,TWO,THREE};
	private HashMap<LocalDateTime, Enum<status>> statusMap; 
	
	
	
}
