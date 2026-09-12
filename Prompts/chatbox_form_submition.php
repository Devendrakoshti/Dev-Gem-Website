<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

// ====== CONFIGURE THIS ======
$OWNER_EMAIL = "tos.webdevuser02@gmail.com";
$FROM_EMAIL  = "teslabim@teslacadservices.com";
$SITE_NAME   = "Tesla Outsourcing Services";
// ============================

// Welcome email with image attachment
function send_welcome_email_with_image($user_email, $user_name = '', $image_path = 'welcome.jpg') {
    global $FROM_EMAIL, $SITE_NAME;

    if (!file_exists($image_path)) {
        return false; // Image not found
    }

    $subject = "Welcome to {$SITE_NAME}!";
    $body    = "Hi " . ($user_name ? $user_name : "there") . ",\n\n"
             . "Welcome to {$SITE_NAME}! We're glad to have you on board.\n\n"
             . "If you have any questions, just reply to this email.\n\n"
             . "Best regards,\n"
             . "{$SITE_NAME} Team";

    $file_content = file_get_contents($image_path);
    $file_name = basename($image_path);
    $file_type = mime_content_type($image_path);
    $file_encoded = chunk_split(base64_encode($file_content));

    $boundary = md5(uniqid(time()));

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "From: {$SITE_NAME} <{$FROM_EMAIL}>";
    $headers[] = "Reply-To: {$SITE_NAME} <{$FROM_EMAIL}>";
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";
    $headersStr = implode("\r\n", $headers);

    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $body . "\r\n\r\n";
    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: {$file_type}; name=\"{$file_name}\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"{$file_name}\"\r\n\r\n";
    $message .= $file_encoded . "\r\n";
    $message .= "--{$boundary}--";

    return mail($user_email, $subject, $message, $headersStr);
}

// POST check
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "❌ Invalid request method.";
    exit;
}

// Input fetch + sanitize
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$message = trim($_POST['message'] ?? '');

// Basic validation
if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo "❌ Name, Email, Phone aur Message required hai.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo "❌ Email format galat hai.";
    exit;
}

if (!preg_match('/^[\p{L}\s\.\-]{2,100}$/u', $name)) {
    http_response_code(422);
    echo "❌ Name valid format me dijiye.";
    exit;
}

if (!preg_match('/^[\d\s\+\-\(\)]{7,20}$/', $phone)) {
    http_response_code(422);
    echo "❌ Phone number valid format me dijiye.";
    exit;
}

if (mb_strlen($message) < 2 || mb_strlen($message) > 1000) {
    http_response_code(422);
    echo "❌ Message 2 se 1000 characters ke beech hona chahiye.";
    exit;
}

// Build owner/admin email (HTML table)
$ownerSubject = "New Chatbox Lead - {$SITE_NAME}";
$ownerBodyHtml = "<h2 style='font-family:sans-serif;color:#333;'>New Chatbox Submission</h2>
<table border='0' cellpadding='8' cellspacing='0' style='border-collapse:collapse;font-family:sans-serif;font-size:15px;min-width:320px;max-width:500px;background:#fafbfc;border:1px solid #e1e4e8;box-shadow:0 2px 8px #0001;'>
    <tr style='background:#f6f8fa;'>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>Name</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>{$name}</td>
    </tr>
    <tr>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>Email</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>{$email}</td>
    </tr>
    <tr style='background:#f6f8fa;'>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>Phone</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>{$phone}</td>
    </tr>
    <tr>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>Message</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>" . nl2br(htmlspecialchars($message)) . "</td>
    </tr>
    <tr style='background:#f6f8fa;'>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>Time</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>" . date('Y-m-d H:i:s') . "</td>
    </tr>
    <tr>
        <th align='left' style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#24292f;'>IP</th>
        <td style='border-bottom:1px solid #e1e4e8;padding:8px 12px;color:#444;'>" . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</td>
    </tr>
</table>";

// Email headers for HTML
$commonHeaders = [];
$commonHeaders[] = "MIME-Version: 1.0";
$commonHeaders[] = "Content-Type: text/html; charset=UTF-8";
$commonHeaders[] = "From: {$SITE_NAME} <{$FROM_EMAIL}>";
$commonHeaders[] = "Reply-To: {$name} <{$email}>";
$commonHeadersStr = implode("\r\n", $commonHeaders);

// Send to owner (HTML version)
$ownerSent = @mail($OWNER_EMAIL, $ownerSubject, $ownerBodyHtml, $commonHeadersStr);

// Autoresponder to user (plain text)
$userSubject = "Thanks! We received your details - {$SITE_NAME}";
$userBody    = "Hi {$name},\n\n"
             . "Thanks for sharing your details. Our team will contact you soon.\n\n"
             . "- {$SITE_NAME}";

$userHeaders = [];
$userHeaders[] = "MIME-Version: 1.0";
$userHeaders[] = "Content-Type: text/plain; charset=UTF-8";
$userHeaders[] = "From: {$SITE_NAME} <{$FROM_EMAIL}>";
$userHeaders[] = "Reply-To: {$SITE_NAME} <{$OWNER_EMAIL}>";
$userHeadersStr = implode("\r\n", $userHeaders);

$userSent = @mail($email, $userSubject, $userBody, $userHeadersStr);

// Send welcome email with image (after main emails)
$welcomeSent = send_welcome_email_with_image($email, $name, __DIR__ . '/images/tesla-services.png');

// Graceful result
if ($ownerSent) {
    echo "✅ Form successfully submitted! (Email sent)";
    // Welcome email with image sent in background (not shown to user)
} else {
    $logLine = "[" . date('Y-m-d H:i:s') . "] SEND_FAIL | {$name} | {$email} | {$phone} | IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
    @file_put_contents(__DIR__ . "/chatbox_mail_fallback.log", $logLine, FILE_APPEND);
    http_response_code(500);
    echo "⚠️ Submission received, par email bhejne me issue aaya. Please try again later.";
}