package nl.group.wms.controller;

import nl.group.wms.Utils;
import nl.group.wms.domein.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class CustomerOrderPickingServcie {
    @Autowired
    CustomerOrderPickingLineRepository coplr;

    @Autowired
    CustomerOrderLineRepository olr;

    @Autowired
    ProductItemRepository pir;

    @Autowired
    CustomerOrderService cos;

    @Autowired
    BoxService bs;


    /**
     * Checks te database for the oldest order with status READY_FOR_PICKING
     * {@link #getCustomerOrderPickingLines(Iterable)}
     *
     * @return a collection of CustomerOrderPickingLines. Including for each line a customerOrderLine and a HashMap with boxinfo: boxId and quantity stored
     */
    public Iterable<CustomerOrderPickingLine> getNextCustomerOrderToPick() {

        Iterable<CustomerOrder> customerOrders = cos.getAllCustomerOrders();

        /* Check if there are orders */
        if (customerOrders.iterator().hasNext()) {

            /* Fill ArrayList with pickable orders */
            ArrayList<CustomerOrder> ordersReadyForPicking = new ArrayList<>();
            for (CustomerOrder order : customerOrders) {
                if (order.getCurrentStatus().equals(CustomerOrder.status.READY_FOR_PICKING)) {
                    ordersReadyForPicking.add(order);
                }
            }

            /* Check for the oldes pickable order */
            if (ordersReadyForPicking.size() > 0) {
                CustomerOrder nextOrderToPick = ordersReadyForPicking.get(0);
                for (CustomerOrder order : ordersReadyForPicking) {
                    if (order.getCurrentStatusLocalDateTime().isAfter(nextOrderToPick.getCurrentStatusLocalDateTime())) {
                        /* Replace new order with older order */
                        nextOrderToPick = order;
                    }
                }
                printOrderInfo(nextOrderToPick); // Print stuff for development purpose


                /* Return orderLines for oldest pickable order */
                long orderId = nextOrderToPick.getId();
                return getCustomerOrderPickingLines(getCustomerOrderLinesById(orderId));
            }
        }

        /* When here, there are no pickable orders in the database ... :( */
        System.out.println(Utils.ic(Utils.ANSI_RED, "NO ORDERS WITH STATUS READY_FOR_PICKING"));
        return null;

    }

    /**
     * Generates and/or updates customerOrderPickingLines for {@link #getNextCustomerOrderToPick()}
     *
     * @param customerOrderLines is used to check for each line if a corresponding CustomerOrderPickingLine should be created or updated
     * @return a collection with CustomerOrderPickingLines.
     */
    public Iterable<CustomerOrderPickingLine> getCustomerOrderPickingLines(Iterable<CustomerOrderLine> customerOrderLines) {
        List<CustomerOrderPickingLine> pickingLines = new ArrayList<>();
        for (CustomerOrderLine customerOrderLine : customerOrderLines) {

            long customerOrderLineId = customerOrderLine.getId();

            long productId = customerOrderLine.getProduct().getId();
            HashMap<Long, Long> boxMap = bs.getAllBoxidsAndQuantityStored(productId);

            CustomerOrderPickingLine pickingLine = null;

            /* Update existing pickingLine entry */
            if (customerOrderPickingLineExistsBy(customerOrderLineId)) {
                List<CustomerOrderPickingLine> existingPickingLines = coplr.findCustomerOrderPickingBy(customerOrderLineId);
                if (existingPickingLines.iterator().hasNext()) {
                    pickingLine = existingPickingLines.iterator().next();
                    pickingLine.setBoxQuantityMap(boxMap);
                    System.out.println("update line: " + pickingLine.getId());
                }

                /* Create new pickingLine entry  */
            } else {
                // create
                pickingLine = new CustomerOrderPickingLine(customerOrderLine, boxMap);
                System.out.println("created line: new line");
            }

            /* Save pickingLine */
            coplr.save(pickingLine);

            /* Add pickingLine to list */
            pickingLines.add(pickingLine);
        }

        Iterable<CustomerOrderPickingLine> result = pickingLines;
        printPickingLineInfo(result); // Print stuff for development purpose
        return result;
    }

    /* NEW */
    public boolean customerOrderPickingLineExistsBy(long customerOrderLineId) {
        long entrys = coplr.customerOrderPickingLineExistsBy(customerOrderLineId);
        if (entrys > 1) {
            System.out.println(Utils.ic(Utils.ANSI_RED, "WARNING: More then one [" + entrys + "] customerOrderPickingLines with customerOrderLineId: " + customerOrderLineId +
                    "\n\tRelationship should be OneToOne"));
        }

        return entrys > 0;
    }


    public Iterable<CustomerOrderLine> getCustomerOrderLinesById(long customerOrderId) {
        Iterable<CustomerOrderLine> orderLines = olr.findByCustomerOrderId(customerOrderId);
        return orderLines;
    }


    /* CONFIRM PICKING */
    // lijst met boxen van besteld product
    // aantal bestelde items
    public void orderLineIsPicked(long customerOrderLineId) {
        // get customerOrderLine
        CustomerOrderLine customerOrderLine = cos.getOrderLine(customerOrderLineId);
        // get product
        // get amount ordered
        long productId = customerOrderLine.getProduct().getId();
        long amountOrdered = customerOrderLine.getAmountOrdered();
        // print to console
        System.out.println("Product naam " + customerOrderLine.getProduct().getName());
        System.out.println("Product id : " + productId);
        System.out.println("Amount ordered : " + amountOrdered);
        // get list of boxes wher product is stored
        Iterable<Box> boxes = bs.getAllBoxesWithProduct(productId);
        //
        for (Box box : boxes) {
            // get list with items in box
            Iterable<ProductItem> productItems = pir.findProductItemByBox(box);
            for (int i = 0; i <= amountOrdered; i++) {
                if (productItems.iterator().hasNext()) {
                    ProductItem item = productItems.iterator().next();
                    System.out.println(item.getId());
                    item.addStatusToMap(ProductItem.status.READY_FOR_TRANSIT);
                    System.out.println(item.getCurrentStatus());

                }
            }

        }

    }







    /* PRINT METHODS */

    public void printPickingLineInfo(Iterable<CustomerOrderPickingLine> pickingLines) {
        for (CustomerOrderPickingLine line : pickingLines) {
            System.out.println("Keys: Boxnumbers");
            System.out.println("Values: Quantity");
            System.out.println(line.getBoxQuantityMap().keySet());
            System.out.println(line.getBoxQuantityMap().values());
        }
    }

    public void printOrderInfo(CustomerOrder nextOrderToPick) {
        System.out.println(Utils.ic(Utils.ANSI_GREEN, "Next order to pick " +
                "\n\tOrder ID: " + nextOrderToPick.getId() +
                "\n\tCurrent status: " + nextOrderToPick.getCurrentStatus() +
                "\n\tLocalDateTime status: " + nextOrderToPick.getCurrentStatusLocalDateTime() +
                "\n\tOrderLines: " + getCustomerOrderLinesById(nextOrderToPick.getId())));
    }

}

