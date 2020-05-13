package nl.group.wms.controller;

import nl.group.wms.domein.TestItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface TestItemRepository extends CrudRepository<TestItem, Long> {


}
