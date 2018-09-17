<?php
declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],
    'internalbilling' => [
        'economic' => [
            'auth' => [
                'agreementToken' => env('ECONOMIC_INTERNAL_BILLING_AGREEMENT_GRANT_TOKEN'),
                'appSecretToken' => env('ECONOMIC_APP_SECRET_TOKEN'),
                'appPublicToken' => env('pURBGzqtsVjtjjl0BwluPHGBKbs2d6OU1sBLj3MA9Jw1'),
            ],
            'settings' => [
                'invoiceLayoutId' => env('ECONOMIC_INTERNAL_BILLING_INVOICE_LAYOUT_NUMBER'),
                'subscriptionProductNumber' => env('ECONOMIC_INTERNAL_BILLING_SUBSCRIPTION_PRODUCT_NUMBER'),
                'subscriptionExtraCasesProductNumber' => env('ECONOMIC_INTERNAL_BILLING_SUBSCRIPTION_EXTRA_CASES_PRODUCT_NUMBER'),
                'subscriptionIndividualCasesProductNumber' => env('ECONOMIC_INTERNAL_BILLING_INDIVIDUAL_CASES_PRODUCT_NUMBER'),
                'paymentTermId' => env('ECONOMIC_INTERNAL_BILLING_PAYMENT_TERM_NUMBER'),
            ],
        ],
    ],
    'facebook' => [
		'client_id' => env('FB_APP_ID', '1542441766081224'),
		'client_secret' => env('FB_SECRET', '2ec779b522b5c1ac3fc1634d0152c741'),
		'redirect' => env('FB_REDIRECT_URI', 'http://localhost:7555/auth/redirect')
    ],
    'google' => [
		'client_secret' => env('ElX12pCJ9-Lm7x0q5mQHQuVZ'),
        'application_id' => ''
    ],
    'linkedin' => [
        'client_secret' => 'fWmQoqRLEL831CpY'
    ]

];
