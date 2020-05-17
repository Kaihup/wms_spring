package nl.group.wms.controller;

import nl.group.wms.Utils;
import nl.group.wms.domein.ProductItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        productItem.addStatusToMap(ProductItem.status.CHECKED_IN);
        pr.save(productItem);
        System.out.println(Utils.ic(Utils.ANSI_CYAN, "Total ProductItem count: " + Long.toString(pr.count())));
        products.findById(productItem.getProduct().getId()).get().increaseStock(1);
    }
}