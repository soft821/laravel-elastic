<?php

return array(
    'dsn' => env('SENTRY_DSN','https://c5c7c193840d4dce8a2b031e1a191b1d:3af59e36fdfa43e69c6b5ea4d5345ab2@sentry.io/266130'),

    // capture release as git sha
    // 'release' => trim(exec('git log --pretty="%h" -n1 HEAD')),

    // Capture bindings on SQL queries
    'breadcrumbs.sql_bindings' => true,

    // Capture default user context
    'user_context' => true,
);
