package nl.group.wms.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nl.group.wms.domein.BackOrder;
import nl.group.wms.domein.BackOrderLine;

@Service
@Transactional
public class PlaceBackOrderService {

	@Autowired
	BackOrderRepository bo;
	
	@Autowired
	BackOrderLineRepository bol;
	
	public Iterable<BackOrder> getAllBackOrders() {
        Iterable<BackOrder> backOrders = bo.findAll();
        return backOrders;
    }
	public Iterable<BackOrderLine> getAllBackOrderLines() {
        Iterable<BackOrderLine> backOrderLines = bol.findAll();
        return backOrderLines;
    }
	public void newBackOrderLine(BackOrderLine backOrderLine) {
        bol.save(backOrderLine);        
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
	

}
