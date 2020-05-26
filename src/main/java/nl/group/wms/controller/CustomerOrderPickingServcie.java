package nl.group.wms.controller;

import nl.group.wms.Utils;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class CustomerOrderPickingServcie {

    @Autowired
    CustomerOrderLineRepository olr;

    @Autowired
    CustomerOrderService cos;

    public Iterable<CustomerOrderLine> getNextCustomerOrderToPick() {

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

                /* Print stuff about order to console for development purpose */
                System.out.println(Utils.ic(Utils.ANSI_GREEN, "Next order to pick " +
                        "\n\tOrder ID: " + nextOrderToPick.getId() +
                        "\n\tCurrent status: " + nextOrderToPick.getCurrentStatus() +
                        "\n\tLocalDateTime status: " + nextOrderToPick.getCurrentStatusLocalDateTime() +
                        "\n\tOrderLines: " + getCustomerOrderLinesById(nextOrderToPick.getId())));

                /* Return orderLines for oldest pickable order */
                long orderId = nextOrderToPick.getId();
                return getCustomerOrderLinesById(orderId);
            }
        }

        /* When here, there are no pickable orders in the database ... :( */
        System.out.println(Utils.ic(Utils.ANSI_RED, "NO ORDERS WITH STATUS READY_FOR_PICKING"));
        return null;

    }


    public Iterable<CustomerOrderLine> getCustomerOrderLinesById(long customerOrderId) {
        Iterable<CustomerOrderLine> orderLines = olr.findByCustomerOrderId(customerOrderId);
        return orderLines;
    }
}
