package com.ecommerce.cart.domain;

import com.ecommerce.shared.domain.AggregateRoot;
import com.ecommerce.shared.domain.Money;
import com.ecommerce.shared.domain.TenantId;

import java.util.*;

public class Cart extends AggregateRoot {

    private final UUID id;
    private final TenantId tenantId;
    private UUID customerId;          // null = guest
    private String sessionId;
    private final List<CartItem> items = new ArrayList<>();
    private String currency;

    private Cart(UUID id, TenantId tenantId, String currency) {
        this.id = id;
        this.tenantId = tenantId;
        this.currency = currency;
    }

    public static Cart create(TenantId tenantId, String currency) {
        return new Cart(UUID.randomUUID(), tenantId, currency);
    }

    public void addItem(UUID productId, String productName, Money unitPrice, int quantity) {
        Optional<CartItem> existing = items.stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().increaseQuantity(quantity);
        } else {
            items.add(new CartItem(productId, productName, unitPrice, quantity));
        }
    }

    public void removeItem(UUID productId) {
        items.removeIf(i -> i.getProductId().equals(productId));
    }

    public void changeQuantity(UUID productId, int newQuantity) {
        items.stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .ifPresent(i -> i.changeQuantity(newQuantity));
    }

    public Money total() {
        return items.stream()
                .map(CartItem::lineTotal)
                .reduce(Money.zero(currency), Money::add);
    }

    public List<CartItem> getItems() {
        return Collections.unmodifiableList(items);
    }

    public UUID getId() { return id; }
    public TenantId getTenantId() { return tenantId; }
}