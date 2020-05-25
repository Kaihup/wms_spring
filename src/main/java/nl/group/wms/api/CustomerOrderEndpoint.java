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

    @PostMapping("/testing")
    public long test(@RequestBody String id){
        System.out.println("this works " + id);
        return (long)5;
    }

    @PostMapping("/addNewCustomerOrder")
    public long addNewOrder(@RequestBody long customerOrderId){
        return cos.addNewCustomerOrder(customerOrderId);
    }

    //This if for one customer
    @GetMapping("/getAllCustomerOrders/{customerId}")
    public List<CustomerOrder> getAllOrders(@PathVariable long customerId){
        List<CustomerOrder> customerOrders = cos.getAllCustomerOrders(customerId);
        return customerOrders;
    }



    @PostMapping("/newCustomerOrderLine")
    public long newOrderLine(@RequestBody CustomerOrderLine customerOrderLine){
        return cos.newCustomerOrderLine(customerOrderLine);
    }



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
    public int getTotalPrice(@RequestBody long customerOrderId){
        return cos.getTotalPrice(customerOrderId);
    }



    @PostMapping("/purchaseOrder")
    public void purchaseOrder(@RequestBody long customerOrderId){
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