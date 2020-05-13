package nl.group.wms.controller;

import nl.group.wms.domein.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WarehouseService {

    @Autowired
    WarehouseRepository wr;

    public void newWarehouse(Warehouse warehouse){
        if(wr.count() < 1) {
            wr.save(warehouse);
        }
    }
}
