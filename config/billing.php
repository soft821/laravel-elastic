<?php
declare(strict_types=1);

return [
    'invoice_layout_number' => env('ECONOMIC_INTERNAL_BILLING_INVOICE_LAYOUT_NUMBER'),
    'subscription_product_number' => env('ECONOMIC_INTERNAL_BILLING_SUBSCRIPTION_PRODUCT_NUMBER'),
    'subscription_extra_cases_product_number' => env('ECONOMIC_INTERNAL_BILLING_SUBSCRIPTION_EXTRA_CASES_PRODUCT_NUMBER'),
    'individual_cases_product_number' => env('ECONOMIC_INTERNAL_BILLING_INDIVIDUAL_CASES_PRODUCT_NUMBER'),
    'payment_term_number' => env('ECONOMIC_INTERNAL_BILLING_PAYMENT_TERM_NUMBER'),
    'customer_group' => env('ECONOMIC_INTERNAL_BILLING_CUSTOMER_GROUP')
];
