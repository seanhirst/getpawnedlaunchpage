<?php
// Set headers to handle CORS and JSON responses
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get the email from the POST data
$data = json_decode(file_get_contents('php://input'), true);
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Prepare email to support@getpawned.io
$to = 'support@getpawned.io';
$subject = 'New Waitlist Signup';
$message = "A new user has joined the waitlist:\n\nEmail: $email\nDate: " . date('Y-m-d H:i:s') . "\n";
$headers = 'From: noreply@getpawned.io' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send email to support
$supportMailSent = mail($to, $subject, $message, $headers);

// Prepare confirmation email to the user
$userSubject = 'Welcome to the GetPawned Waitlist!';
$userMessage = "Hello,\n\nThank you for joining the GetPawned waitlist! We're excited to have you on board.\n\n" .
    "You'll be among the first to know when we launch our revolutionary platform for pawn shop owners.\n\n" .
    "Stay tuned for updates and exclusive early access opportunities.\n\n" .
    "Best regards,\nThe GetPawned Team";
$userHeaders = 'From: support@getpawned.io' . "\r\n" .
    'Reply-To: support@getpawned.io' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send confirmation email to user
$userMailSent = mail($email, $userSubject, $userMessage, $userHeaders);

// Check if emails were sent successfully
if ($supportMailSent && $userMailSent) {
    echo json_encode(['success' => true, 'message' => 'You\'re in! You\'ll be the first to know when we launch. 🚀']);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
}
?>