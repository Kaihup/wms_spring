package nl.group.wms.controller;

import nl.group.wms.domein.CustomerOrderLine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface CustomerOrderLineRepository extends CrudRepository<CustomerOrderLine, Long> {
    //List<CustomerOrderLine> findByOrderId(Long orderId);
}
