package nl.group.wms.controller;

import nl.group.wms.Utils;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
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
    CustomerOrderLineRepository olr;

    @Autowired
    ProductRepository pr;

    public long addNewCustomerOrder(CustomerOrder customerOrder) {
        customerOrder.addStatusToMap(CustomerOrder.status.NEW_ORDER_INCOMING);
        cor.save(customerOrder);
        return customerOrder.getId();
    }

    public List<CustomerOrder> getAllCustomerOrdersByCustomerId(long customerId) {
        Iterable<CustomerOrder> customerOrders = cor.findAll();
        List<CustomerOrder> customerOrders1 = new ArrayList<>();
        for (CustomerOrder customerOrder : customerOrders) {
            if (customerOrder.getCustomer().getId() == customerId) {
                customerOrders1.add(customerOrder);
            }
        }
        return customerOrders1;
    }

    public Iterable<CustomerOrder> getAllCustomerOrders() {
        Iterable<CustomerOrder> customerOrders = cor.findAll();
        return customerOrders;
    }

//    public Iterable<CustomerOrderLine> getNextPickingOrder() {
//
//        Iterable<CustomerOrder> orders = cor.findAll();
//
//        CustomerOrder nextOrderToPick;
//
//        if (orders.iterator().hasNext()) {
//            nextOrderToPick = orders.iterator().next();
//        }
//
//        for (CustomerOrder order : orders) {
//            for (HashMap<LocalDateTime,>)
////            CustomerOrder.status.CONFIRMED;
//        }
//        return nextCustomerOrderToPick;
//    }


    public long newCustomerOrderLine(CustomerOrderLine customerOrderLine) {
         /* Omdat niet zeker is of de prijs aan de voorkant wordt meegenomen is,
         het veiliger om met productId te werken. */
        Long productId = customerOrderLine.getProduct().getId();

        /* Op basis van productId is het product met de bijbehorende prijs op te vragen.
         Zo weet je zeker dat je de goede prijs hebt */
        int unitPrice = pr.findById(productId).get().getPrice();
        int amount = customerOrderLine.getAmount();

        int totalPrice = amount * unitPrice;
        customerOrderLine.setPrice(totalPrice);
        olr.save(customerOrderLine);
        customerOrderLine.getProduct().decreaseStock(customerOrderLine.getAmount());
        return customerOrderLine.getId();
    }

    public void updateCustomerOrderLine(int amountIncrease, long customerOrderLineId) {
        CustomerOrderLine customerOrderLine = olr.findById(customerOrderLineId).get();
        int currentAmount = customerOrderLine.getAmount();
        if (amountIncrease > currentAmount) {
            customerOrderLine.setAmount(currentAmount);
            customerOrderLine.setPrice(customerOrderLine.getAmount() * customerOrderLine.getProduct().getPrice());
        } else {
            customerOrderLine.setAmount(currentAmount + amountIncrease);
            customerOrderLine.setPrice(customerOrderLine.getAmount() * customerOrderLine.getProduct().getPrice());
        }
    }

    public int getTotalPrice(long customerOrderId) {
        Iterable<CustomerOrderLine> customerOrderLines = olr.findAll();
        int totalPrice = 0;
        for (CustomerOrderLine customerOrderLine : customerOrderLines) {
            if (customerOrderLine.getCustomerOrder().getId() == customerOrderId) {
                totalPrice += customerOrderLine.getPrice();
            }
        }
        return totalPrice;
    }

    public void removeProductItems(int amountRemoved, long customerOrderLineId) {
        CustomerOrderLine customerOrderLine = olr.findById(customerOrderLineId).get();
        int currentAmount = customerOrderLine.getAmount();
        if (amountRemoved > currentAmount) {
            customerOrderLine.setAmount(0);
        } else {
            customerOrderLine.setAmount(currentAmount - amountRemoved);
        }
    }

    public Iterable<CustomerOrderLine> getNextCustomerOrderToPick() {
        Iterable<CustomerOrder> customerOrders = getAllCustomerOrders();
        CustomerOrder nextOrderToPick = customerOrders.iterator().next();
        for (CustomerOrder order : customerOrders) {
            if (order.getCurrentStatus() == CustomerOrder.status.READY_FOR_PICKING) {
                if (order.getCurrentStatusLocalDateTime().isBefore(nextOrderToPick.getCurrentStatusLocalDateTime())) {
                    nextOrderToPick = order;
                    System.out.println(Utils.ic(Utils.ANSI_CYAN, "Next order to pick " + nextOrderToPick.getId()));
                }
            }
        }
        return getCustomerOrderLinesById(nextOrderToPick.getId());
    }

    public Iterable<CustomerOrderLine> getCustomerOrderLinesById(long customerOrderId) {
        Iterable<CustomerOrderLine> orderLines = olr.findByCustomerOrderId(customerOrderId);
        return orderLines;
    }

    public void purchaseOrder(long customerOrderId) {
        CustomerOrder customerOrder = cor.findById(customerOrderId).get();
        customerOrder.addStatusToMap(CustomerOrder.status.READY_FOR_PICKING);
    }
}