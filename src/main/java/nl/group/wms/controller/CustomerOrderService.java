package nl.group.wms.controller;

import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
import nl.group.wms.domein.Product;
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
    CustomerRepository cr;

    @Autowired
    ProductRepository pr;

    public long addNewCustomerOrder(long customerId) {
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setCustomer(cr.findById(customerId).get());
        customerOrder.addStatusToMap(CustomerOrder.status.PRE_PURCHASE);
        System.out.println("A new customer order is placed");
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

    public void addStatusToCustomerOrder(Enum<CustomerOrder.status> statusEnum, Long orderId) {
        CustomerOrder order = cor.findById(orderId).get();
        order.addStatusToMap(statusEnum);
        cor.save(order);
    }

    public void updateCustomerOrder(CustomerOrder customerOrder) {
        cor.save(customerOrder);
    }


//    public long newCustomerOrderLine(CustomerOrderLine customerOrderLine) {
//         /* Omdat niet zeker is of de prijs aan de voorkant wordt meegenomen is,
//         het veiliger om met productId te werken. */
//        Long productId = customerOrderLine.getProduct().getId();
//
//        /* Op basis van productId is het product met de bijbehorende prijs op te vragen.
//         Zo weet je zeker dat je de goede prijs hebt */
//        int unitPrice = pr.findById(productId).get().getPrice();
//        int amount = customerOrderLine.getAmountOrdered();
//
//        int totalPrice = amount * unitPrice;
//        customerOrderLine.setPrice(totalPrice);
//        olr.save(customerOrderLine);
//        customerOrderLine.getProduct().decreaseStock(customerOrderLine.getAmountOrdered());
//        return customerOrderLine.getId();
//    }

    public long newCustomerOrderLine(long customerOrderId, long productId, int amount) {
        Product product = pr.findById(productId).get();
        int unitPrice = product.getPrice();
        int totalPrice = amount * unitPrice;

        CustomerOrderLine customerOrderLine = new CustomerOrderLine();
        customerOrderLine.setPrice(totalPrice);
        customerOrderLine.setAmountOrdered(amount);
        customerOrderLine.setProduct(product);
        CustomerOrder customerOrder = cor.findById(customerOrderId).get();
        customerOrderLine.setCustomerOrder(customerOrder);

        olr.save(customerOrderLine);
        return customerOrderLine.getId();
    }

    public void updateCustomerOrderLine(int amountIncrease, long customerOrderLineId) {
        CustomerOrderLine customerOrderLine = olr.findById(customerOrderLineId).get();
        int currentAmount = customerOrderLine.getAmountOrdered();
        if (amountIncrease > currentAmount) {
            customerOrderLine.setAmountOrdered(currentAmount);
            customerOrderLine.setPrice(customerOrderLine.getAmountOrdered() * customerOrderLine.getProduct().getPrice());
        } else {
            customerOrderLine.setAmountOrdered(currentAmount + amountIncrease);
            customerOrderLine.setPrice(customerOrderLine.getAmountOrdered() * customerOrderLine.getProduct().getPrice());
        }
    }

    public void removeProductItems(int amountRemoved, long customerOrderLineId) {
        CustomerOrderLine customerOrderLine = olr.findById(customerOrderLineId).get();
        int currentAmount = customerOrderLine.getAmountOrdered();
        if (amountRemoved > currentAmount) {
            customerOrderLine.setAmountOrdered(0);
            customerOrderLine.setPrice(customerOrderLine.getAmountOrdered() * customerOrderLine.getProduct().getPrice());
        } else {
            customerOrderLine.setAmountOrdered(currentAmount - amountRemoved);
            customerOrderLine.setPrice(customerOrderLine.getAmountOrdered() * customerOrderLine.getProduct().getPrice());
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
        System.out.println("The total price of the order is: " + totalPrice);
        return totalPrice;
    }



    public void purchaseOrder(long customerOrderId) {
        CustomerOrder customerOrder = cor.findById(customerOrderId).get();
        customerOrder.addStatusToMap(CustomerOrder.status.READY_FOR_PICKING);

        List<CustomerOrderLine> customerOrderLines1 = new ArrayList<>();
        Iterable<CustomerOrderLine> customerOrderLines = olr.findAll();
        for (CustomerOrderLine customerOrderLine : customerOrderLines){
            if(customerOrderLine.getCustomerOrder().getId() == customerOrderId){
                customerOrderLines1.add(customerOrderLine);
                Product product = customerOrderLine.getProduct();
                product.decreaseStock(customerOrderLine.getAmountOrdered());
                pr.save(product);
            }
        }


    }
}