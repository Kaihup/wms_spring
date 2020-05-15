package nl.group.wms.api;

import nl.group.wms.Utils;
import nl.group.wms.controller.BoxService;
import nl.group.wms.domein.Box;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoxEndPoint {

    @Autowired
    BoxService bs;

 /*  @Autowired
    ProductItem pri;*/

    @GetMapping("/allboxes")
    public Iterable<Box> getAllProducts() {
        Iterable<Box> boxes = bs.getAllBoxes();
        return boxes;
    }

    /*@GetMapping("/itemsinbox")
    public int getItemsInBox() {
        List<ProductItem> findByBoxId(ProductItem);
    }*/

    @PostMapping("/newbox/{productId}")
    public void addNewBox(@RequestBody Box box, @PathVariable Long productId){
        System.out.println(Utils.ic(Utils.ANSI_CYAN,"Added a new box: " + box.getId()));
        bs.newBox(box, productId);
    }

//    @GetMapping("/deleteproduct")
//    public void deleteExistingProduct() {
//        ps.deleteProduct(2);
//    }



}
