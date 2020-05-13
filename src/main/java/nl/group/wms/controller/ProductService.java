package nl.group.wms.controller;

import nl.group.wms.domein.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {

    @Autowired
    ProductRepository pr;

    public Iterable<Product> getAllProducts() {
        Iterable<Product> producten = pr.findAll();
        return producten;
    }

    public void newProduct(Product product) {
        pr.save(product);
    }

}