<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

/* ================= FORM DATA ================= */
$name    = htmlspecialchars($_POST['name'] ?? '');
$email   = htmlspecialchars($_POST['email'] ?? '');
$phone   = htmlspecialchars($_POST['phone'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');
$date    = date("d-m-Y H:i:s");

/* ================= CSV SAVE ================= */
$csvFile = 'submission.csv';

if (!file_exists($csvFile)) {
    $file = fopen($csvFile, 'w');
    fputcsv($file, ["Date", "Name", "Email", "Phone", "Message"]);
    fclose($file);
}

$file = fopen($csvFile, 'a');
fputcsv($file, [$date, $name, $email, $phone, $message]);
fclose($file);

/* ================= EMAIL BODY ================= */
$emailBody = "
<h3 style='font-family:Arial'>New Website Form Submission</h3>
<table border='1' cellpadding='10' cellspacing='0' width='100%'
style='border-collapse:collapse;font-family:Arial'>
<tr style='background:#f2f2f2'>
<th align='left'>Field</th>
<th align='left'>Details</th>
</tr>
<tr><td>Date</td><td>$date</td></tr>
<tr><td>Name</td><td>$name</td></tr>
<tr><td>Email</td><td>$email</td></tr>
<tr><td>Phone</td><td>$phone</td></tr>
<tr><td>Message</td><td>$message</td></tr>
</table>
";

/* ================= SMTP CONFIG ================= */
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yourmail@gmail.com';   // 🔴 SMTP EMAIL
    $mail->Password   = 'APP_PASSWORD_HERE';    // 🔴 APP PASSWORD
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('yourmail@gmail.com', 'Website Enquiry');
    $mail->addReplyTo($email, $name);

    /* ================= 10 EMAIL RECIPIENTS ================= */
    $recipients = [
        'info@yourdomain.com',
        'sales@yourdomain.com',
        'support@yourdomain.com',
        'admin@yourdomain.com',
        'manager@yourdomain.com',
        'hr@yourdomain.com',
        'owner@gmail.com',
        'backup@gmail.com',
        'team1@gmail.com',
        'team2@gmail.com'
    ];

    foreach ($recipients as $to) {
        $mail->addAddress($to);
    }

    $mail->isHTML(true);
    $mail->Subject = 'New Form Submission - Website';
    $mail->Body    = $emailBody;

    $mail->send();

    /* ================= SUCCESS REDIRECT ================= */
    header("Location: thank-you.php");
    exit;

} catch (Exception $e) {
    // Optional: error page
    header("Location: error.php");
    exit;
}
?>
