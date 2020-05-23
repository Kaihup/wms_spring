package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    public List<CustomerOrder> getAllOrders(long customerId){
        Iterable<CustomerOrder> customerOrders = cor.findAll();
        List<CustomerOrder> customerOrders1 = new ArrayList<>();
        for (CustomerOrder customerOrder : customerOrders){
            if(customerOrder.getCustomer().getId() == customerId){
                customerOrders1.add(customerOrder);
            }
        }
        return customerOrders1;
    }


    public long newOrderLine(OrderLine orderLine){
        olr.save(orderLine);
        orderLine.getProduct().decreaseStock(orderLine.getAmount());
        orderLine.setPrice(orderLine.getAmount()*orderLine.getProduct().getPrice());
        return orderLine.getId();
    }

    public void updateOrderLine(int amountIncrease, long orderLineId){
        OrderLine orderLine = olr.findById(orderLineId).get();
        int currentAmount = orderLine.getAmount();
        if (amountIncrease > currentAmount){
            orderLine.setAmount(currentAmount);
            orderLine.setPrice(orderLine.getAmount()*orderLine.getProduct().getPrice());
        }
        else{
            orderLine.setAmount(currentAmount + amountIncrease);
            orderLine.setPrice(orderLine.getAmount()*orderLine.getProduct().getPrice());
        }
    }

    public int getTotalPrice(long customerOrderId){
        Iterable<OrderLine> orderLines = olr.findAll();
        int totalPrice = 0;
        for (OrderLine orderLine : orderLines){
            if(orderLine.getCustomerOrder().getId() == customerOrderId){
                totalPrice += orderLine.getPrice();
            }
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

//    public void purchaseOrder(long customerOrderId){
//        CustomerOrder customerOrder = cor.findById(customerOrderId).get();
//        List<OrderLine> orderLines = customerOrder.getOrderline();
//        for (OrderLine orderLine : orderLines){
//            //Lijst van producten teruggeven?
//        }
//    }


}