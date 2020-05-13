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
    
    @Autowired
    ProductRepository products;

    public Iterable<ProductItem> getAllProductItems() {
        Iterable<ProductItem> productItems = pr.findAll();
        return productItems;
    }

    public void newProductItem(ProductItem productItem) {
        //productItem.getProduct().increaseStock(1);
        productItem.addStatusToMap(ProductItem.status.CHECKEDIN);
        pr.save(productItem);
        products.findById(productItem.getProduct().getId()).get().increaseStock(1);
    }
    
    
}