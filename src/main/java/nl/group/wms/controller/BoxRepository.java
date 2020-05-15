package nl.group.wms.controller;

import nl.group.wms.domein.Box;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;



@Component
public interface BoxRepository extends CrudRepository<Box, Long> {

}