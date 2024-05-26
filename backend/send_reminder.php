<?php
include_once 'config/database.php';
require 'C:/xampp/htdocs/task-manager/libs/PHPMailer/src/PHPMailer.php';
require 'C:/xampp/htdocs/task-manager/libs/PHPMailer/src/SMTP.php';
require 'C:/xampp/htdocs/task-manager/libs/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$logFile = 'C:/xampp/htdocs/task-manager/logs/reminder_log.txt';

function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

logMessage("Script started.");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, title, description, deadline, email FROM tasks WHERE deadline BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)";
$stmt = $db->prepare($query);
$stmt->execute();

logMessage("Query executed.");

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@example.com';
        $mail->Password = 'your-email-password';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your-email@example.com', 'Task Manager');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Task Reminder';
        $mail->Body = "<h1>Reminder</h1><p>This is a reminder for your task: <b>$title</b><br>Description: $description<br>Deadline: $deadline</p>";

        $mail->send();
        logMessage("Email sent to $email for task $title.");
    } catch (Exception $e) {
        logMessage("Failed to send email to $email for task $title. Error: " . $mail->ErrorInfo);
    }
}

logMessage("Script ended.");
?>


