package nl.group.wms.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nl.group.wms.controller.PlaceBackOrderService;
import nl.group.wms.domein.BackOrder;
import nl.group.wms.domein.BackOrderLine;

@RestController
public class PlaceBackOrderEndpoint {
	
	@Autowired
	PlaceBackOrderService pbs;
	
	@PostMapping("/newbackorder")
    public void addNewBackOrder(@RequestBody BackOrder backOrder){
        pbs.newBackOrder(backOrder);
    }
	@PostMapping("/newbackorderline")
    public void addNewBackOrderLine(@RequestBody BackOrderLine backOrderLine){
        pbs.newBackOrderLine(backOrderLine);
    }
	
	@GetMapping("/getlatestbackorderid")
	public long getBackOrderId() {
		return pbs.getLatestBackOrderId();	
	}
}
