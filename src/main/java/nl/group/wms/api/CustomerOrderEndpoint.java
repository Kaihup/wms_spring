package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerOrderEndpoint {

    @Autowired
    CustomerOrderService cos;

    @PostMapping("/addNewOrder")
    public long addNewOrder(@RequestBody CustomerOrder customerOrder){
        return cos.addNewOrder(customerOrder);
    }

    @GetMapping("/getAllOrders")
    public Iterable<CustomerOrder> getAllOrders(){
        Iterable<CustomerOrder> customerOrders = cos.getAllOrders();
        return customerOrders;
    }

    @PostMapping("/addOrderLine/{orderLineId}/{customerOrderId}")
    public void addOrderLine(@PathVariable long orderLineId, @PathVariable long customerOrderId){
        cos.addOrderLine(orderLineId,customerOrderId);
    }

    @PostMapping("/newOrderLine")
    public long newOrderLine(@RequestBody OrderLine orderLine){
        return cos.newOrderLine(orderLine);
    }

    @PostMapping("/updateOrderLine")
    public void updateOrderLine(@RequestBody int amountIncrease, @RequestBody long orderLineId){
        cos.updateOrderLine(amountIncrease, orderLineId);
    }

    @PostMapping("/getTotalPrice")
    public int getTotalPrice(@RequestBody long customerOrderId){
        return cos.getTotalPrice(customerOrderId);
    }

    @PostMapping("/removeProductItems")
    public void removeProductItems(@RequestBody int amountRemoved, @RequestBody long orderLineId){
        cos.removeProductItems(amountRemoved, orderLineId);
    }

    @PostMapping("/purchaseOrder")
    public void purchaseOrder(@RequestBody long customerOrderId){
        cos.purchaseOrder(customerOrderId);
    }

}