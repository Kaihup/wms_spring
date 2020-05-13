package nl.group.wms.api;

import nl.group.wms.Utils;
import nl.group.wms.controller.ProductService;
import nl.group.wms.domein.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductEndpoint {

    @Autowired
    ProductService ps;

    @GetMapping("/allproducts")
    public Iterable<Product> getAllProducts() {
        Iterable<Product> producten = ps.getAllProducts();
        return producten;
    }

    @PostMapping("/newProduct")
    public void addNewProduct(@RequestBody Product product){
        System.out.println(Utils.ic(Utils.ANSI_CYAN,"A new product: " + product.getName()));
        ps.newProduct(product);
    }
}
