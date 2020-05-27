package nl.group.wms.controller;

import nl.group.wms.domein.BackOrderDelivery;
import nl.group.wms.domein.BackOrderDeliveryStorage;
import nl.group.wms.domein.BackOrderLine;
import nl.group.wms.domein.Box;
import nl.group.wms.domein.Product;
import nl.group.wms.domein.ProductItem;

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
    
    @Autowired
    ProductItemRepository pir;
    
    @Autowired
    BackOrderDeliveryRepository bodr;
    
    @Autowired
    BackOrderDeliveryStorageRepository bodsr;    

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
    
    
	public void createStorageLines(long deliveryId) {
		BackOrderDelivery delivery = bodr.findById(deliveryId).get();
		for (BackOrderLine line : delivery.getLines()) {
			long productId = line.getProduct().getId();
			int amountToStore = line.getAmountReceived();
			List<Box> boxes = findEmptySpots(productId, amountToStore);
			for(Box box : boxes) {
				int emptyStorage = (box.getMaxProductItems() - box.getCurrentItems());
				int storeAmount = (amountToStore >= emptyStorage) ? emptyStorage : amountToStore;
				for (int x = 0; x < storeAmount; x++) {
					ProductItem item = pir.findFirstByCurrentStatusAndProductAndBox(ProductItem.status.CHECKED_IN, line.getProduct(), null);
					item.setBox(box);
					pir.save(item);
				}
				BackOrderDeliveryStorage storageLine = new BackOrderDeliveryStorage();
				storageLine.setAmountToStore(storeAmount);
				storageLine.setBox(box);
				storageLine.setDelivery(delivery);
				storageLine.setProduct(line.getProduct());
				bodsr.save(storageLine);
				box.increaseCurrentItems(storeAmount);
				br.save(box);				
				amountToStore -= storeAmount;
			}
		}	
	}
	 
	public List<BackOrderDeliveryStorage> getStorageLines(long deliveryId){
		return bodsr.findByBackOrderDelivery(deliveryId);
		
	}
	
	public void confirmStorageLine(long storageLineId, int actuallyStored) {
		BackOrderDeliveryStorage storageLine = bodsr.findById(storageLineId).get();
		storageLine.setStorageConfirmed(true);
		storageLine.setActuallyStored(actuallyStored);
		bodsr.save(storageLine);
		for (int x = 0; x < actuallyStored; x++) {
			ProductItem item = pir.findFirstByCurrentStatusAndProductAndBox(ProductItem.status.CHECKED_IN, 
					storageLine.getProduct(), storageLine.getBox());
			item.addStatusToMap(ProductItem.status.IN_STORAGE);
			pir.save(item);
		}
		if (storageLine.getAmountToStore() > actuallyStored) {
			int deviation = (storageLine.getAmountToStore() - actuallyStored);
			for (int y = 0; y < deviation; y++) {
				ProductItem item = pir.findFirstByCurrentStatusAndProductAndBox(ProductItem.status.CHECKED_IN, 
						storageLine.getProduct(), storageLine.getBox());
				pir.delete(item);
			}
			Box box = storageLine.getBox();
			box.decreaseCurrentItems(deviation);
			br.save(box);
		}
		
	}
	

}