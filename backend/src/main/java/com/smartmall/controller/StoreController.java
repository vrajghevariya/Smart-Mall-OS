package com.smartmall.controller;

import com.smartmall.entity.Store;
import com.smartmall.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StoreController {

    private final StoreRepository storeRepository;

    @GetMapping
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Store> getStore(@PathVariable Long id) {
        return storeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Store createStore(@RequestBody Store store) {
        return storeRepository.save(store);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStore(@PathVariable Long id, @RequestBody Store storeDetails) {
        return storeRepository.findById(id)
                .map(store -> {
                    store.setName(storeDetails.getName());
                    store.setDescription(storeDetails.getDescription());
                    store.setCategory(storeDetails.getCategory());
                    store.setFloor(storeDetails.getFloor());
                    store.setIsOpen(storeDetails.getIsOpen());
                    store.setOpeningHours(storeDetails.getOpeningHours());
                    return ResponseEntity.ok(storeRepository.save(store));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        if (storeRepository.existsById(id)) {
            storeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
