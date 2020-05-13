package nl.group.wms.controller;

import nl.group.wms.domein.Warehouse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface WarehouseRepository extends CrudRepository<Warehouse, Long> {
}

