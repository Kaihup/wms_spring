package nl.group.wms.api;

import nl.group.wms.Utils;
import nl.group.wms.controller.ProductItemService;
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

    @GetMapping("/allproductitems")
    public Iterable<ProductItem> getAllProductItems() {
        Iterable<ProductItem> productItems = ps.getAllProductItems();
        return productItems;
    }

    @PostMapping("/newproductitem")
    public void addNewProduct(@RequestBody ProductItem productItem){
        ps.newProductItem(productItem);
        System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new productItem ID: " + productItem.getId()));
    }
}
