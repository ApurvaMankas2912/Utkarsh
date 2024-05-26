<?php
include_once 'C:/xampp/htdocs/task-manager/backend/config/database.php';

header('Content-Type: application/json');

$id = $_GET['id'];

$database = new Database();
$db = $database->getConnection();

$query = "DELETE FROM tasks WHERE id = ?";
$stmt = $db->prepare($query);
$stmt->execute([$id]);

echo json_encode(['message' => 'Task deleted successfully']);
?>
