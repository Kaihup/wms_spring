package nl.group.wms.controller;

import nl.group.wms.domein.ProductItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductItemRepository extends CrudRepository<ProductItem, Long> {

}