package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import nl.group.wms.domein.CustomerOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    CustomerRepository cr;

    @Autowired
    CustomerOrderRepository cor;

    public void addNewCustomer(Customer customer){
        cr.save(customer);
    }

    public Iterable<Customer> getAllCustomers() {
        Iterable<Customer> customers = cr.findAll();
        return customers;
    }

    public void addOrder(long customerOrderId, long customerId){
        Optional<CustomerOrder> customerOrder = cor.findById(customerOrderId);
        Optional<Customer> customer = cr.findById(customerId);
        Customer newOrder = customer.get();
        newOrder.getCustomerOrders().add(customerOrder.get());
        cr.save(newOrder);
    }
}
