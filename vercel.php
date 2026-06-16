<?php

/**
 * Vercel serverless entry point.
 * Kept outside api/ so Laravel /api/* routes are not shadowed.
 */
$databaseSource = __DIR__.'/database/portfolio.sqlite';
$databaseTarget = '/tmp/portfolio.sqlite';

if (is_readable($databaseSource) && ! is_readable($databaseTarget)) {
    copy($databaseSource, $databaseTarget);
}

require __DIR__.'/public/index.php';
