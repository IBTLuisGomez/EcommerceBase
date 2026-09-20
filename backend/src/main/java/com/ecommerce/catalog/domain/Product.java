package com.ecommerce.catalog.domain;

import com.ecommerce.shared.domain.AggregateRoot;
import com.ecommerce.shared.domain.Money;
import com.ecommerce.shared.domain.TenantId;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Product extends AggregateRoot {

    private final UUID id;
    private final TenantId tenantId;
    private String name;
    private String slug;
    private String description;
    private Money price;
    private Money compareAtPrice;
    private int stock;
    private boolean trackInventory;
    private List<String> images;
    private boolean active;
    private boolean featured;

    private Product(UUID id, TenantId tenantId, String name, String slug, Money price) {
        this.id = id;
        this.tenantId = Objects.requireNonNull(tenantId);
        this.name = Objects.requireNonNull(name);
        this.slug = Objects.requireNonNull(slug);
        this.price = Objects.requireNonNull(price);
        this.images = new ArrayList<>();
        this.active = true;
        this.trackInventory = true;
        this.stock = 0;
    }

    public static Product create(TenantId tenantId, String name, String slug, Money price) {
        return new Product(UUID.randomUUID(), tenantId, name, slug, price);
    }

    public void updatePrice(Money newPrice) {
        this.price = Objects.requireNonNull(newPrice);
    }

    public void addStock(int quantity) {
        if (quantity < 0) throw new IllegalArgumentException("Quantity must be positive");
        this.stock += quantity;
    }

    public void reduceStock(int quantity) {
        if (!trackInventory) return;
        if (this.stock < quantity) {
            throw new InsufficientStockException(this.id, quantity, this.stock);
        }
        this.stock -= quantity;
    }

    public boolean isAvailable() {
        return active && (!trackInventory || stock > 0);
    }

    // Getters...
    public UUID getId() { return id; }
    public TenantId getTenantId() { return tenantId; }
    public String getName() { return name; }
    public Money getPrice() { return price; }
    public int getStock() { return stock; }
}