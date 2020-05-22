package nl.group.wms.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import nl.group.wms.domein.BackOrder;
import nl.group.wms.domein.BackOrderDelivery;
import nl.group.wms.domein.BackOrderLine;

@Service
@Transactional
public class PlaceBackOrderService {

	@Autowired
	BackOrderRepository bo;
	
	@Autowired
	BackOrderLineRepository bol;
	
	@Autowired
	BackOrderDeliveryRepository bod;
	
	public BackOrderDelivery getBODelivery(long id) {
        BackOrderDelivery delivery = bod.findById(id).get();
        return delivery;
    }
	
	public Iterable<BackOrder> getAllBackOrders() {
        Iterable<BackOrder> backOrders = bo.findAll();
        return backOrders;
    }
	public Iterable<BackOrderLine> getAllBackOrderLines() {
        Iterable<BackOrderLine> backOrderLines = bol.findAll();
        return backOrderLines;
    }
	public long newBackOrderLine(BackOrderLine backOrderLine) {
        bol.save(backOrderLine); 
        return backOrderLine.getId();
    }
	public void newBackOrder(BackOrder backOrder) {
		backOrder.setOrderDate(LocalDateTime.now());
		backOrder.setDeliveryStatus("Ordered");
        bo.save(backOrder);    
    }
	public long getLatestBackOrderId() {
		Iterable<BackOrder> backOrders = bo.findAll();
		long x=0;
		LocalDateTime time = LocalDateTime.MIN;
		for(BackOrder backorder: backOrders) {
			if (backorder.getOrderDate().isAfter(time)) {
				x = backorder.getId();
				time = backorder.getOrderDate();
			}
		}
		return x;
	}
	
	public Iterable<BackOrderDelivery> getAllBODeliveries() {
		Iterable<BackOrderDelivery> BODeliveries = bod.findAll();
        return BODeliveries;
	}
	
	public long newBODelivery(BackOrderDelivery BODelivery) {
		BODelivery.addStatusToMap(BackOrderDelivery.status.EXPECTED);
        bod.save(BODelivery); 
        return BODelivery.getId();
    }
	
	public void addBOLineToDelivery(long lineId, long deliveryId) {
		Optional<BackOrderLine> line = bol.findById(lineId);
		Optional<BackOrderDelivery> delivery = bod.findById(deliveryId);
		BackOrderDelivery newLine = delivery.get();
		newLine.getLines().add(line.get());
		bod.save(newLine);
	}
	
	public void setDeliveryArrived(long deliveryId, String licensePlate) {
		BackOrderDelivery delivery = bod.findById(deliveryId).get();
		delivery.addStatusToMap(BackOrderDelivery.status.ARRIVED);
		delivery.setDeliveryDate(LocalDate.now());
		delivery.setLicensePlateDeliverer(licensePlate);
		bod.save(delivery);
	}
	
}
