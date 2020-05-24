package nl.group.wms.controller;

import nl.group.wms.domein.Box;
import nl.group.wms.domein.Product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BoxService {

    @Autowired
    BoxRepository br;

    @Autowired
    ProductRepository pr;

    public Iterable<Box> getAllBoxes() {
        Iterable<Box> boxes = br.findAll();
        return boxes;
    }

    public void newBox(Box box, Long productId) {

        box.setProduct(pr.findById(productId).get());
        br.save(box);
    }
    
    public List<Box> findEmptySpots(long productId, int amountToStore) {
    	//Product product = pr.findById(productId).get();
    	List<Box> boxes = br.findByProduct(productId);
    	List<Box> availableBoxes = new ArrayList<Box>();
    	for (Box box : boxes) {
    		int currentAmount = box.getCurrentItems();
    		int maxAmount = box.getMaxProductItems();
    		if (currentAmount == maxAmount) {
    			continue;
    		} else {
    			availableBoxes.add(box);
    			amountToStore -= (maxAmount - currentAmount);
    			if (amountToStore <= 0) break;
    		}
    	}
    	return availableBoxes;
    }

}