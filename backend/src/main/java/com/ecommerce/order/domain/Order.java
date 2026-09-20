package com.ecommerce.order.domain;

import com.ecommerce.shared.domain.AggregateRoot;
import com.ecommerce.shared.domain.Money;
import com.ecommerce.shared.domain.TenantId;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Order extends AggregateRoot {

    private final UUID id;
    private final TenantId tenantId;
    private final String orderNumber;
    private OrderStatus status;
    private final List<OrderItem> items = new ArrayList<>();
    private Money subtotal;
    private Money total;
    private final String currency;

    private Order(UUID id, TenantId tenantId, String orderNumber, String currency) {
        this.id = id;
        this.tenantId = tenantId;
        this.orderNumber = orderNumber;
        this.currency = currency;
        this.status = OrderStatus.PENDING;
    }

    public static Order createFromCart(TenantId tenantId, String orderNumber, String currency, List<OrderItem> items) {
        Order order = new Order(UUID.randomUUID(), tenantId, orderNumber, currency);
        order.items.addAll(items);
        order.recalculateTotals();
        return order;
    }

    public void markAsPaid() {
        if (status != OrderStatus.PENDING) {
            throw new IllegalStateException("Only PENDING orders can be paid");
        }
        this.status = OrderStatus.PAID;
        // registerEvent(new OrderPaidEvent(...));
    }

    private void recalculateTotals() {
        this.subtotal = items.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(Money.zero(currency), Money::add);
        this.total = this.subtotal; // + shipping + tax - discount
    }

    // Getters...
}