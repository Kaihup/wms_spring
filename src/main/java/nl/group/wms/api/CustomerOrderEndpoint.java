package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
