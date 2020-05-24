package nl.group.wms.api;

import nl.group.wms.Utils;
import nl.group.wms.controller.CustomerService;
import nl.group.wms.domein.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerEndpoint {

    @Autowired
    CustomerService cs;

    @PostMapping("/newcustomer")
    public void addNewCustomer(@RequestBody Customer customer) {
        System.out.println(Utils.ic(Utils.ANSI_RED, "A new costumer: " + customer.getEmail()));
        cs.addNewCustomer(customer);
    }

    @GetMapping("/getcustomers") // werkt
    public Iterable<Customer> getAllCustomers() {
        Iterable<Customer> customers = cs.getAllCustomers();
        return customers;
    }

    @PostMapping("/getcustomer")
    public Customer getCustomer(@RequestBody long Id) {
        return getCustomer(Id);
    }

//    @PostMapping("/newCustomerOrder/{customerOrderId}/{customerId}")
//    public void addOrder(@PathVariable long customerOrderId, @PathVariable long customerId){
//        cs.addOrder(customerOrderId, customerId);
//    }


}
