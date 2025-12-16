<?php 
if (!empty($_POST['email']) && ($_POST['email'] != '')) {
    if (isset($_POST['s_key']) && isset($_POST['s_val'])) {
        $s_key = (int)$_POST['s_key'];
        $s_val = (int)$_POST['s_val'];
        $count = $s_val - $s_key;
        if ($count != 8) {
            $errors .= "Error: Invalid count value.\n";
        }
    } else {
        $errors .= "Error: Missing s_key or s_val.\n";
    }
    require_once($_SERVER['DOCUMENT_ROOT'] . '/blog/wp-load.php');
}
$errors = '';

if(empty($_POST['name'])  || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) )
{
    $errors .= "\n Error: all fields are required";
}
$name = isset($_POST['name'])? $_POST['name'] : ''; 
$email_address = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone'])? $_POST['phone'] : '';
$country = isset ($_POST['country']) ? $_POST['country'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';//
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $_POST['email'])) {
    $errors .= "\n Error: Invalid email address";
}
// Verify Google reCAPTCHA
$secretKey = "6LfWdi4rAAAAAH4APEnU85MgTgjrbGyfmUZv2Ie0"; // replace with your secret key
$responseKey = $_POST['g-recaptcha-response'];
$userIP = $_SERVER['REMOTE_ADDR'];

$verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP";
$response = file_get_contents($verifyUrl);
$responseData = json_decode($response);

if(!$responseData->success) {
    $errors .= "\n Error: Captcha verification failed";
}
if(!empty($_POST['website'])) die(); 
if( empty($errors)) {
    global $wpdb;
    $date = date('Y-m-d H:i:s');
    $wpdb->insert("wp_cte", array(
       "name" => $name,
       "email" => $email_address,
       "phone" => $phone,
       "country" => $country  ,
       "message" => $message,
       "create_date" => $date,
        "ip" => get_client_ip(),
    ));

    $to = 'services@teslaoutsourcingservices.com, teslainquiry@gmail.com, poojarapk@gmail.com, poojarakpp@gmail.com, prex@teslacadd.com, poojarakp@teslacadd.com, teslainquiry@gmail.com';
    $email_subject = " TOS Footer Form: $email_address, $name";
    
    $email_message = "You have received a new message. \n". "Here are the details:\n Name: $name \n Email: $email_address \n Phone: $phone \n Country: $country \n Message: \n $message \n IP: $ip " ; 

    $email_body .= "You have received a new message. Here are the details:"."\n";
    $email_body .= "Name: ".$name."\n";
    $email_body .= "Email: ".$email_address."\n";
    $email_body .= "Phone: ".$phone."\n";
    $email_body .= "Country: ".$country."\n";
    $email_body .= "Message: ".$message."\n";
    $email_body .= "IP: ".$ip."\n"; 

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";//      
    $headers .= 'From: '.$name.'<'.$email_address.'>' . "\r\n";
    $headers .= "Reply-To: $email_address";

    $email_body = '<html><body>';

    $email_body = '<table rules="all" style="border-collapse: collapse; border:1px solid #000; max-width: 550px; font-size: 15px; font-family: arial;" cellpadding="0">';

    // $email_body .= "<tr><td colspan='6' style='padding: 8px 10px; background: #fff; border:1px solid #000; text-align: center;'><img loading="lazy"src='images/logo.png' alt='logo'></td></tr>";

    $email_body .= "<tr><td colspan='6' style='padding: 8px 10px; background: #0c213c; text-align: center; border:1px solid #000; color: #fff;'>You have received a new message from TOS Footer Form. Here are the details:</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; background: #fff; border:1px solid #000; vertical-align:middle;'><strong>Name<strong></td><td style='padding: 8px 10px; background: #fff; border:1px solid #000;'>".$name."</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; border:1px solid #000; background: #efefef;'><strong>Email<strong></td><td style='padding: 8px 10px; background: #efefef; border:1px solid #000;'>".$email_address."</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; border:1px solid #000;'><strong>Phone<strong></td><td style='padding: 8px 10px; border:1px solid #000;'>".$phone."</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; border:1px solid #000;background: #efefef;'><strong>Country<strong></td><td style='padding: 8px 10px; border:1px solid #000;background: #efefef;'>".$country."</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; border:1px solid #000;'><strong>Message<strong></td><td style='padding: 8px 10px; border:1px solid #000;'>".$message."</td></tr>";

    $email_body .= "<tr><td style='padding: 8px 10px; background: #efefef; border:1px solid #000;'><strong>IP<strong></td><td style='padding: 8px 10px; background: #efefef; border:1px solid #000;'>".$ip."</td></tr>";

    $email_body .= "</table>";
    
    $message .= "</body></html>";//
    

    //mail($to, $email_subject, $email_body, $headers);
    wp_mail( $to, $email_subject, $email_body, $headers );
    header('Location:https://www.teslaoutsourcingservices.com/thank-you.php');
} 

function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
?>





<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <title></title>
<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>




</body>
</html>
