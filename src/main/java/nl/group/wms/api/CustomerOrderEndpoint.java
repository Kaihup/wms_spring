package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerOrderEndpoint {

    @Autowired
    CustomerOrderService cos;

    @PostMapping("/addNewOrder")
    public long addNewOrder(@RequestBody CustomerOrder customerOrder){
        return cos.addNewOrder(customerOrder);
    }

    //This if for one customer
    @PostMapping("/getAllOrders")
    public List<CustomerOrder> getAllOrders(@RequestBody long customerId){
        List<CustomerOrder> customerOrders = cos.getAllOrders(customerId);
        return customerOrders;
    }

    @PostMapping("/newOrderLine")
    public long newOrderLine(@RequestBody OrderLine orderLine){
        return cos.newOrderLine(orderLine);
    }

    @PostMapping("/updateOrderLine")
    public void updateOrderLine(@RequestBody int amountIncrease, @RequestBody long orderLineId){
        cos.updateOrderLine(amountIncrease, orderLineId);
    }

    //This if for one customer
    @PostMapping("/getTotalPrice")
    public int getTotalPrice(@RequestBody long customerOrderId){
        return cos.getTotalPrice(customerOrderId);
    }

    @PostMapping("/removeProductItems")
    public void removeProductItems(@RequestBody int amountRemoved, @RequestBody long orderLineId){
        cos.removeProductItems(amountRemoved, orderLineId);
    }

//    @PostMapping("/purchaseOrder")
//    public void purchaseOrder(@RequestBody long customerOrderId){
//        cos.purchaseOrder(customerOrderId);
//    }

}