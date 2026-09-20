package com.smartmall.repository;

import com.smartmall.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByCategory(String category);
    List<Store> findByFloor(String floor);
    List<Store> findByIsOpenTrue();
}
