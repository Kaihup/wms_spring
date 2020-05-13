package nl.group.wms.controller;

import nl.group.wms.domein.Product;
import nl.group.wms.domein.ProductItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class ProductItemService {

    @Autowired
    ProductItemRepository pr;
    ProductRepository ps;

    public Iterable<ProductItem> getAllProductItems() {
        Iterable<ProductItem> productItems = pr.findAll();
        return productItems;
    }

    public void newProductItem(ProductItem productItem) {
        Product product = productItem.getProduct();
        //long id = product.getId();
        product.increaseStock(1);
        System.out.println("new product item");
        System.out.println(product.getInStock());
        productItem.addStatusToMap(ProductItem.status.CHECKEDIN);
        pr.save(productItem);
    }
}