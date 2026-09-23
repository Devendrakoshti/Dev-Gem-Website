<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {

    $secretKey = "6Lc0jMstAAAAACpaT9eThXA0jGUAtq3P0Y1YPYib";
    $captcha   = $_POST['g-recaptcha-response'] ?? '';

    if (empty($captcha)) {
        die("Captcha not checked.");
    }

    $verifyResponse = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$captcha}"
    );

    $responseData = json_decode($verifyResponse);

    if (!$responseData->success) {
        die("Captcha validation failed.");
    }

    $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email   = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $country = htmlspecialchars(trim($_POST['country'] ?? ''));
    $message = nl2br(htmlspecialchars(trim($_POST['message'] ?? '')));
    $date    = date("d M Y, h:i A");

    $body = "
    <h3 style='font-family:Arial'>User Form Details</h3>
    <table border='1' cellpadding='10' cellspacing='0' width='100%'
    style='border-collapse:collapse;font-family:Arial'>
        <tr style='background:#f2f2f2'>
            <th>Field</th><th>Details</th>
        </tr>
        <tr><td>Date</td><td>$date</td></tr>
        <tr><td>Name</td><td>$name</td></tr>
        <tr><td>Email</td><td>$email</td></tr>
        <tr><td>Phone</td><td>$phone</td></tr>
        <tr><td>Country</td><td>$country</td></tr>
        <tr><td>Message</td><td>$message</td></tr>
    </table>";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@gemgujarat.in';
        $mail->Password   = 'gem_Gujarat_02';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('info@gemgujarat.in', 'GEM Gujarat Website');
        $mail->addReplyTo($email, $name);
        $mail->addAddress('info@gemgujarat.in');
        $mail->addAddress('devkoshti02@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'Gem Gujarat Form Submission';
        $mail->Body    = $body;

        $mail->send();

        header("Location: thank-you.php");
        exit;

    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
