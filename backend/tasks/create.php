<?php
include_once 'C:/xampp/htdocs/task-manager/backend/config/database.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$title = $input['title'];
$description = $input['description'];
$deadline = $input['deadline'];
$email = $input['email'];

$database = new Database();
$db = $database->getConnection();

$query = "INSERT INTO tasks (title, description, deadline, email) VALUES (?, ?, ?, ?)";
$stmt = $db->prepare($query);
$stmt->execute([$title, $description, $deadline, $email]);

echo json_encode(['message' => 'Task created successfully']);
?>
