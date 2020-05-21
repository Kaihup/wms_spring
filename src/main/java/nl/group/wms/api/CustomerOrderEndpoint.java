package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerOrderEndpoint {

    @Autowired
    CustomerOrderService os;

    @PostMapping("/addNewOrder")
    public void addNewOrder(@RequestBody CustomerOrder customerOrder){
        System.out.println("This is a new order");
        os.addNewOrder(customerOrder);
    }

    @GetMapping("/getAllOrders")
    public Iterable<CustomerOrder> getAllOrders(){
        Iterable<CustomerOrder> customerOrders = os.getAllOrders();
        return customerOrders;
    }

    @PostMapping("/newOrderLine/{orderLineId}/{customerOrderId")
    public void addOrderLine(@PathVariable long orderLineId, @PathVariable long customerOrderId){
        os.addOrderLine(orderLineId,customerOrderId);
    }




}
