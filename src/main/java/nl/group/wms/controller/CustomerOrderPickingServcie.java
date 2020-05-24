package nl.group.wms.controller;

import nl.group.wms.Utils;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerOrderPickingServcie {

    @Autowired
    CustomerOrderLineRepository olr;

    @Autowired
    CustomerOrderService cos;

    public Iterable<CustomerOrderLine> getNextCustomerOrderToPick() {
        Iterable<CustomerOrder> customerOrders = cos.getAllCustomerOrders();


        if (!customerOrders.iterator().hasNext()) {
            return null;

        } else {

            CustomerOrder nextOrderToPick = null;
            for (CustomerOrder order : customerOrders) {
                System.out.println("!1: in order: " + order.getId());
                System.out.println("current status = " + order.getCurrentStatus());
                if (order.getCurrentStatus().equals(CustomerOrder.status.READY_FOR_PICKING)) {
                    System.out.println("!2: in order: " + order.getId());
                    if (order.getCurrentStatusLocalDateTime().isBefore(nextOrderToPick.getCurrentStatusLocalDateTime())) {
                        System.out.println("!3: in order: " + order.getId());
                        nextOrderToPick = order;
                    }
                }
            }

            if (nextOrderToPick != null) {
                long orderId = nextOrderToPick.getId();
                System.out.println(Utils.ic(Utils.ANSI_BLUE, "Next order to pick " +
                        "\n\tOrder ID: " + orderId));
                //                "\n\tOrderLines: " + getCustomerOrderLinesById(orderId)));

                return getCustomerOrderLinesById(orderId);
            }

            return null;

        }
    }

    public Iterable<CustomerOrderLine> getCustomerOrderLinesById(long customerOrderId) {
        Iterable<CustomerOrderLine> orderLines = olr.findByCustomerOrderId(customerOrderId);
        return orderLines;
    }
}
