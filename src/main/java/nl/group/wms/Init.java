package nl.group.wms;

import nl.group.wms.domein.Warehouse;

public class Init {

    public void initializeWarehouse(int length, int width, int height) {
        Warehouse warehouse = new Warehouse(height,length,width);
    }



}


