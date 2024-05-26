<?php
include_once 'C:/xampp/htdocs/task-manager/backend/config/database.php';

header('Content-Type: application/json');

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, title, description, deadline, email FROM tasks";
$stmt = $db->prepare($query);
$stmt->execute();

$tasks = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $tasks[] = [
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'deadline' => $deadline,
        'email' => $email
    ];
}

echo json_encode($tasks);
?>
