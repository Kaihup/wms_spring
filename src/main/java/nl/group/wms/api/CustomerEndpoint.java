package nl.group.wms.api;

import nl.group.wms.Utils;
import nl.group.wms.controller.CustomerService;
import nl.group.wms.domein.Customer;
import nl.group.wms.domein.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerEndpoint {

    @Autowired
    CustomerService cs;

    @PostMapping("/newcustomer")
    public void addNewCustomer(@RequestBody Customer customer){
        System.out.println(Utils.ic(Utils.ANSI_RED,"A new costumer: " + customer.getEmail()
                + " " + customer.getLastName()));
        cs.addNewCustomer(customer);
    }

    @GetMapping("/getcustomers")
    public Iterable<Customer> getAllCustomers(){
        Iterable<Customer> customers = cs.getAllCustomers();
        return customers;
    }

    @PostMapping("/newCustomerOrder/{customerOrderId}/{customerId}")
    public void addOrder(@PathVariable long customerOrderId, @PathVariable long customerId){
        cs.addOrder(customerOrderId, customerId);
    }


}


