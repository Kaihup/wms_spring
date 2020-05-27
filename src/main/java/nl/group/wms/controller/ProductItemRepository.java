package nl.group.wms.controller;

import nl.group.wms.domein.Box;
import nl.group.wms.domein.Product;
import nl.group.wms.domein.ProductItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductItemRepository extends CrudRepository<ProductItem, Long> {

    ProductItem findFirstByCurrentStatusAndProductAndBox(Enum status, Product product, Box box);

    Long countByBoxId(Long boxId);

}