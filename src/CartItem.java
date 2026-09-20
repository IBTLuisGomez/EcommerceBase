package com.ecommerce.cart.domain;

import com.ecommerce.shared.domain.Money;

import java.util.UUID;

public class CartItem {
    private final UUID productId;
    private final String productName;
    private final Money unitPrice;
    private int quantity;

    public CartItem(UUID productId, String productName, Money unitPrice, int quantity) {
        this.productId = productId;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public void increaseQuantity(int amount) {
        this.quantity += amount;
    }

    public void changeQuantity(int newQuantity) {
        if (newQuantity <= 0) throw new IllegalArgumentException("Quantity must be > 0");
        this.quantity = newQuantity;
    }

    public Money lineTotal() {
        return unitPrice.multiply(quantity);
    }

    // Getters
    public UUID getProductId() { return productId; }
    public String getProductName() { return productName; }
    public Money getUnitPrice() { return unitPrice; }
    public int getQuantity() { return quantity; }
}