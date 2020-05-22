package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerOrderService {

    @Autowired
    CustomerOrderRepository cor;

    @Autowired
    OrderLineRepository olr;

    public long addNewOrder(CustomerOrder customerOrder){
        customerOrder.addStatusToMap(CustomerOrder.status.NEW_ORDER_INCOMING);
        cor.save(customerOrder);
        return customerOrder.getId();
    }

    public long newOrderLine(OrderLine orderLine){
        olr.save(orderLine);
        orderLine.getProduct().increaseStock(-orderLine.getAmount());
        return orderLine.getId();
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

    public int getTotalPrice(long customerOrderId){
        CustomerOrder customerOrder = cor.findById(customerOrderId).get();
        List<OrderLine> orderLines = customerOrder.getOrderline();
        int totalPrice = 0;
        for (OrderLine orderLine : orderLines){
            totalPrice += orderLine.getPrice()*orderLine.getAmount();
        }
        return totalPrice;
    }

    public void removeProductItems(int amountRemoved, long orderLineId){
        OrderLine orderLine = olr.findById(orderLineId).get();
        int currentAmount = orderLine.getAmount();
        if (amountRemoved > currentAmount){
            orderLine.setAmount(0);
        }
        else{
            orderLine.setAmount(currentAmount - amountRemoved);
        }
    }

    public void purchaseOrder(){
        //De order kopen.
    }


}
