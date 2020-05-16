package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import nl.group.wms.domein.ProductItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    CustomerRepository cr;

    public void addNewCustomer(Customer customer){
        cr.save(customer);
    }


    public Iterable<Customer> getAllCustomers() {
        Iterable<Customer> customers = cr.findAll();
        return customers;
    }
}
