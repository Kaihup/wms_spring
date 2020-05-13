package nl.group.wms.api;

import nl.group.wms.controller.WarehouseService;
import nl.group.wms.domein.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarehouseEndpoint {

    @Autowired
    WarehouseService ws;

    @PostMapping("/newwarehouse")
    public void addNewWarehouse(@RequestBody Warehouse warehouse){
        ws.newWarehouse(warehouse);
    }

}
