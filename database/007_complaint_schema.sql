CREATE TABLE IF NOT EXISTS Complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_role ENUM('student', 'teacher', 'admin', 'super-admin', 'transport-admin', 'technical-staff', 'non-technical-staff') NOT NULL,
  category ENUM('Academic', 'Infrastructure', 'Transport', 'Hostel', 'Canteen', 'Other') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'In Progress', 'Resolved', 'Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
