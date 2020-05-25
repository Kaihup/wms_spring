package nl.group.wms.controller;

import nl.group.wms.domein.Box;
import nl.group.wms.domein.Product;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;



@Component
public interface BoxRepository extends CrudRepository<Box, Long> {
	
	@Query(value="select * from Box b where b.product_id=:product order by (max_product_items - current_items)", 
			nativeQuery=true)
	public List<Box> findByProduct(@Param("product") long productId);
}