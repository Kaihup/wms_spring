package nl.group.wms.controller;

import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.OrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CustomerOrderService {

    @Autowired
    CustomerOrderRepository cor;

    @Autowired
    OrderLineRepository olr;

    @Autowired
    ProductRepository pr;

    public long addNewOrder(CustomerOrder customerOrder) {
        customerOrder.addStatusToMap(CustomerOrder.status.NEW_ORDER_INCOMING);
        cor.save(customerOrder);
        return customerOrder.getId();
    }

    public List<CustomerOrder> getAllOrders(long customerId) {
        Iterable<CustomerOrder> customerOrders = cor.findAll();
        List<CustomerOrder> customerOrders1 = new ArrayList<>();
        for (CustomerOrder customerOrder : customerOrders) {
            if (customerOrder.getCustomer().getId() == customerId) {
                customerOrders1.add(customerOrder);
            }
        }
        return customerOrders1;
    }


    public long newOrderLine(OrderLine orderLine) {
         /* Omdat niet zeker is of de prijs aan de voorkant wordt meegenomen is,
         het veiliger om met productId te werken. */
        Long productId = orderLine.getProduct().getId();

        /* Op basis van productId is het product met de bijbehorende prijs op te vragen.
         Zo weet je zeker dat je de goede prijs hebt */
        int unitPrice = pr.findById(productId).get().getPrice();
        int amount = orderLine.getAmount();

        int totalPrice = amount * unitPrice;
        orderLine.setPrice(totalPrice);
        olr.save(orderLine);
        orderLine.getProduct().decreaseStock(orderLine.getAmount());
        return orderLine.getId();
    }

    public void updateOrderLine(int amountIncrease, long orderLineId) {
        OrderLine orderLine = olr.findById(orderLineId).get();
        int currentAmount = orderLine.getAmount();
        if (amountIncrease > currentAmount) {
            orderLine.setAmount(currentAmount);
            orderLine.setPrice(orderLine.getAmount() * orderLine.getProduct().getPrice());
        } else {
            orderLine.setAmount(currentAmount + amountIncrease);
            orderLine.setPrice(orderLine.getAmount() * orderLine.getProduct().getPrice());
        }
    }

    public int getTotalPrice(long customerOrderId) {
        Iterable<OrderLine> orderLines = olr.findAll();
        int totalPrice = 0;
        for (OrderLine orderLine : orderLines) {
            if (orderLine.getCustomerOrder().getId() == customerOrderId) {
                totalPrice += orderLine.getPrice();
            }
        }
        return totalPrice;
    }

    public void removeProductItems(int amountRemoved, long orderLineId) {
        OrderLine orderLine = olr.findById(orderLineId).get();
        int currentAmount = orderLine.getAmount();
        if (amountRemoved > currentAmount) {
            orderLine.setAmount(0);
        } else {
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