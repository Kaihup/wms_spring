package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerOrderEndpoint {

    @Autowired
    CustomerOrderService cos;

    @PostMapping("/addNewCustomerOrder")
    public long addNewOrder(@RequestBody long customerOrderId) {
        return cos.addNewCustomerOrder(customerOrderId);
    }
    //This is for one customer
    @GetMapping("/getAllCustomerOrders/{customerId}")
    public List<CustomerOrder> getAllCustomerOrdersByCustomerId(@PathVariable long customerId) {
        List<CustomerOrder> customerOrders = cos.getAllCustomerOrdersByCustomerId(customerId);
        return customerOrders;
    }


    @PostMapping("/newCustomerOrderLine")
    public long newOrderLine(@RequestBody CustomerOrderLine customerOrderLine) {
        return cos.newCustomerOrderLine(customerOrderLine);
    }

//    @PostMapping("/newCustomerOrderLine")
//    public long newOrderLine(@RequestBody long customerOrderId, @RequestBody long productId) {
//        return cos.newCustomerOrderLine(customerOrderLine);
//    }

    @PostMapping("/updateCustomerOrderLine/{amountIncrease}/{customerOrderLineId}")
    public void updateOrderLine(@PathVariable int amountIncrease, @PathVariable long customerOrderLineId){
        cos.updateCustomerOrderLine(amountIncrease, customerOrderLineId);
    }

    @PostMapping("/removeProductItems")
    public void removeProductItems(@RequestBody int amountRemoved, @RequestBody long customerOrderLineId){
        cos.removeProductItems(amountRemoved, customerOrderLineId);
    }

    //This if for one customer
    @PostMapping("/getTotalPrice")
    public int getTotalPrice(@RequestBody long customerOrderId) {
        return cos.getTotalPrice(customerOrderId);
    }

    @PostMapping("/purchaseOrder")
    public void purchaseOrder(@RequestBody long customerOrderId) {
        cos.purchaseOrder(customerOrderId);
    }

}


//    @PostMapping("/updateCustomerOrderLine")
//    public void updateOrderLine(@RequestBody int amountIncrease, @RequestBody long customerOrderLineId){
//        cos.updateCustomerOrderLine(amountIncrease, customerOrderLineId);
//    }

//    @PostMapping("/removeProductItems")
//    public void removeProductItems(@RequestBody int amountRemoved, @RequestBody long customerOrderLineId){
//        cos.removeProductItems(amountRemoved, customerOrderLineId);
//    }