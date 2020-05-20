package nl.group.wms.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nl.group.wms.controller.PlaceBackOrderService;
import nl.group.wms.domein.BackOrder;
import nl.group.wms.domein.BackOrderDelivery;
import nl.group.wms.domein.BackOrderLine;
import nl.group.wms.domein.Product;

@RestController
public class PlaceBackOrderEndpoint {
	
	@Autowired
	PlaceBackOrderService pbs;
	
	@PostMapping("/newBackOrder")
    public void addNewBackOrder(@RequestBody BackOrder backOrder){
        pbs.newBackOrder(backOrder);
    }
	@PostMapping("/newBackOrderLine")
    public void addNewBackOrderLine(@RequestBody BackOrderLine backOrderLine){
        pbs.newBackOrderLine(backOrderLine);
    }
	
	@GetMapping("/getLatestBackOrderId")
	public long getBackOrderId() {
		return pbs.getLatestBackOrderId();	
	}
	@PostMapping("/newBODelivery")
    public void addNewBODelivery(@RequestBody BackOrderDelivery backOrderDelivery){
        pbs.newBODelivery(backOrderDelivery);
    }
	@GetMapping("/allBODeliveries")
    public Iterable<BackOrderDelivery> getAllBODeliveries() {
        Iterable<BackOrderDelivery> deliveries = pbs.getAllBODeliveries();
        return deliveries;
    }
	@PostMapping("/{deliveryId}/{lineId}")
	public void addBOLineToDelivery(@PathVariable long deliveryId, @PathVariable long lineId) {
		
		pbs.addBOLineToDelivery(lineId, deliveryId);
	}
}
