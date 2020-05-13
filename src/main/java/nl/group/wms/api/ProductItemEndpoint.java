package nl.group.wms.api;

import nl.group.wms.controller.ProductItemService;
import nl.group.wms.domein.Product;
import nl.group.wms.domein.ProductItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductItemEndpoint {

    @Autowired
    ProductItemService ps;

    @GetMapping("/allproductItems")
    public Iterable<ProductItem> getAllProductItems() {
        Iterable<ProductItem> productItems = ps.getAllProductItems();
        return productItems;
    }


    @PostMapping("/newProductItem")
<<<<<<< HEAD
    public void addNewProduct(@RequestBody Product product){
        //System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new productItem ID: " + productItem.getId()));
        ps.newProductItem();
=======
    public void addNewProduct(@RequestBody ProductItem productItem){
        ps.newProductItem(productItem);
        System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new productItem ID: " + productItem.getId()));
>>>>>>> master
    }



//    --> Oud
//    @PostMapping("/newProductItem")
//    public void addNewProduct(@RequestBody ProductItem productItem){
//        System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new productItem ID: " + productItem.getId()));
//        ps.newProductItem(productItem);
//    }
}
