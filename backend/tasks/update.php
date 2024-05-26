<?php
include_once 'C:/xampp/htdocs/task-manager/backend/config/database.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'];
$title = $input['title'];
$description = $input['description'];
$deadline = $input['deadline'];
$email = $input['email'];

$database = new Database();
$db = $database->getConnection();

$query = "UPDATE tasks SET title = ?, description = ?, deadline = ?, email = ? WHERE id = ?";
$stmt = $db->prepare($query);
$stmt->execute([$title, $description, $deadline, $email, $id]);

echo json_encode(['message' => 'Task updated successfully']);
?>
