CREATE TABLE IF NOT EXISTS TeacherProfiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  phone_number VARCHAR(20),
  qualification VARCHAR(255),
  experience_years INT,
  joining_date DATE,
  FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE CASCADE
);
