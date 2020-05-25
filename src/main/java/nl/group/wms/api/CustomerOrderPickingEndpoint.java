package nl.group.wms.api;

import nl.group.wms.controller.CustomerOrderPickingServcie;
import nl.group.wms.controller.CustomerOrderRepository;
import nl.group.wms.controller.CustomerOrderService;
import nl.group.wms.domein.CustomerOrder;
import nl.group.wms.domein.CustomerOrderLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CustomerOrderPickingEndpoint {

    @Autowired
    CustomerOrderRepository cor;

    @Autowired
    CustomerOrderPickingServcie cops;

    @Autowired
    CustomerOrderService cos;

    //This is for one customer
    @GetMapping("/getNextCustomerOrderToPick")
    public Iterable<CustomerOrderLine> getNextCustomerOrderToPick() {
        Iterable<CustomerOrderLine> orderLines = cops.getNextCustomerOrderToPick();
        return orderLines;
    }

    @GetMapping("/addCustomerOrderStatusSend/{orderId}")
    public void setPickedOrderStatus(@PathVariable Long orderId) {
        CustomerOrder order = cor.findById(orderId).get();
        order.addStatusToMap(CustomerOrder.status.SHIPPED_TO_CUSTOMER);
        cos.updateCustomerOrder(order);
    }

    @GetMapping("/addCustomerOrderStatusIncomming/{orderId}")
    public void setPickedOrderStatusIncomming(@PathVariable Long orderId) {
        CustomerOrder order = cor.findById(orderId).get();
        order.addStatusToMap(CustomerOrder.status.PRE_PURCHASE);
        cos.updateCustomerOrder(order);
    }

    @GetMapping("/addCustomerOrderStatusReady/{orderId}")
    public void setPickedOrderStatusReady(@PathVariable Long orderId) {
        CustomerOrder order = cor.findById(orderId).get();
        order.addStatusToMap(CustomerOrder.status.READY_FOR_PICKING);
        cos.updateCustomerOrder(order);
    }

    @GetMapping("/getCurrentStatus/{orderId}")
    public void getCurrentStatus(@PathVariable Long orderId) {
        CustomerOrder order = cor.findById(orderId).get();
        order.getCurrentStatus();
    }


}
