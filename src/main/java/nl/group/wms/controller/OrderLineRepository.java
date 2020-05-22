package nl.group.wms.controller;

import nl.group.wms.domein.OrderLine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface OrderLineRepository extends CrudRepository<OrderLine, Long> {

}
