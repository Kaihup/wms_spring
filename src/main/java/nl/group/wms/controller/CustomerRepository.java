package nl.group.wms.controller;

import nl.group.wms.domein.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface CustomerRepository extends CrudRepository<Customer, Long>{

}
