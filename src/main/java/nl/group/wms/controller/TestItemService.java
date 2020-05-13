package nl.group.wms.controller;

import nl.group.wms.domein.Product;
import nl.group.wms.domein.TestItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TestItemService {

    @Autowired
    TestItemRepository tr;

    public Iterable<TestItem> getAllTestItems() {
        Iterable<TestItem> testItems = tr.findAll();
        return testItems;
    }

    public void newTestItem(Product product) {
        TestItem testItem = new TestItem(product);
        tr.save(testItem);
    }

}
