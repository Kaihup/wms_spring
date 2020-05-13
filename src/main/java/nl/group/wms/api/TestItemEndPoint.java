package nl.group.wms.api;

import nl.group.wms.controller.TestItemService;
import nl.group.wms.domein.Product;
import nl.group.wms.domein.TestItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestItemEndPoint {

    @Autowired
    TestItemService ts;

    @GetMapping("/alltestitems")
    public Iterable<TestItem> getAllProductItems() {
        Iterable<TestItem> testItems = ts.getAllTestItems();
        return testItems;
    }


    @PostMapping("/newTestItem")
    public void addNewProduct(@RequestBody Product product){
        product = new Product();
        ts.newTestItem(product);
    }



//    --> Oud
//    @PostMapping("/newProductItem")
//    public void addNewProduct(@RequestBody ProductItem productItem){
//        System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new productItem ID: " + productItem.getId()));
//        ps.newProductItem(productItem);
//    }
}
