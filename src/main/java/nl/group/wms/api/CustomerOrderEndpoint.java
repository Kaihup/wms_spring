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
    public long addNewOrder(@RequestBody CustomerOrder customerOrder) {
        return cos.addNewCustomerOrder(customerOrder);
    }


    //This is for one customer
    @GetMapping("/getAllCustomerOrders/{customerId}")
    public List<CustomerOrder> getAllCustomerOrdersByCustomerId(@PathVariable long customerId) {
        List<CustomerOrder> customerOrders = cos.getAllCustomerOrdersByCustomerId(customerId);
        return customerOrders;
    }


    @GetMapping("/getNextCustomerOrderToPick")
    public Iterable<CustomerOrderLine> getNextCustomerOrderToPick() {
        Iterable<CustomerOrderLine> customerOrderLines = cos.getNextCustomerOrderToPick();
        return customerOrderLines;
    }


    @PostMapping("/newCustomerOrderLine")
    public long newOrderLine(@RequestBody CustomerOrderLine customerOrderLine) {
        return cos.newCustomerOrderLine(customerOrderLine);
    }

    @PostMapping("/updateCustomerOrderLine")
    public void updateOrderLine(@RequestBody int amountIncrease, @RequestBody long customerOrderLineId) {
        cos.updateCustomerOrderLine(amountIncrease, customerOrderLineId);
    }

    //This if for one customer
    @PostMapping("/getTotalPrice")
    public int getTotalPrice(@RequestBody long customerOrderId) {
        return cos.getTotalPrice(customerOrderId);
    }

    @PostMapping("/removeProductItems")
    public void removeProductItems(@RequestBody int amountRemoved, @RequestBody long customerOrderLineId) {
        cos.removeProductItems(amountRemoved, customerOrderLineId);
    }

//    @PostMapping("/purchaseOrder")
//    public void purchaseOrder(@RequestBody long customerOrderId){
//        cos.purchaseOrder(customerOrderId);
//    }

}