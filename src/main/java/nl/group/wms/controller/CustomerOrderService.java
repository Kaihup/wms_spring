package nl.group.wms.controller;

import nl.group.wms.domein.CustomerOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerOrderService {

    @Autowired
    CustomerOrderRepository or;



    public void addNewOrder(CustomerOrder customerOrder){
        customerOrder.addStatusToMap(CustomerOrder.status.RECEIVED);
        or.save(customerOrder);
    }

    public Iterable<CustomerOrder> getAllOrders(){
        Iterable<CustomerOrder> customerOrders = or.findAll();
        return customerOrders;
    }



}
