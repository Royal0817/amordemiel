<?php

function app_now(): string
{
    $tz = new DateTimeZone('America/New_York');
    return (new DateTimeImmutable('now', $tz))->format('Y-m-d H:i:s');
}

