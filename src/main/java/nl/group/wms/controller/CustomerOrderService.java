package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CustomerOrderService {

    @Autowired
    CustomerOrderRepository cor;

    @Autowired
    OrderLineRepository olr;

    public void addNewOrder(CustomerOrder customerOrder){
        customerOrder.addStatusToMap(CustomerOrder.status.RECEIVED);
        cor.save(customerOrder);
    }

    public Iterable<CustomerOrder> getAllOrders(){
        Iterable<CustomerOrder> customerOrders = cor.findAll();
        return customerOrders;
    }

    public void addOrderLine(long orderLineId, long customerOrderId){
        Optional<OrderLine> orderLine = olr.findById(orderLineId);
        Optional<CustomerOrder> customerOrder = cor.findById(customerOrderId);
        CustomerOrder newCustomerOrder = customerOrder.get();
        newCustomerOrder.getOrderline().add(orderLine.get());
        cor.save(newCustomerOrder);
    }




}
