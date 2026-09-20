package com.smartmall.controller;

import com.smartmall.entity.Product;
import com.smartmall.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        return productRepository.search(q);
    }

    @GetMapping("/recommendations")
    public List<Product> getRecommendations(@RequestParam(required = false) Long productId) {
        if (productId != null) {
            return productRepository.findById(productId)
                    .map(p -> productRepository.findByCategoryAndIdNot(p.getCategory(), p.getId()))
                    .orElse(productRepository.findTop10ByOrderByReviewCountDesc());
        }
        return productRepository.findTop10ByOrderByReviewCountDesc();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product details) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(details.getName());
                    product.setDescription(details.getDescription());
                    product.setPrice(details.getPrice());
                    product.setOriginalPrice(details.getOriginalPrice());
                    product.setDiscount(details.getDiscount());
                    product.setCategory(details.getCategory());
                    product.setStock(details.getStock());
                    product.setTags(details.getTags());
                    return ResponseEntity.ok(productRepository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
