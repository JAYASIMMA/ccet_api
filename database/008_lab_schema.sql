-- Lab Tables
CREATE TABLE IF NOT EXISTS Labs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Polymorphic association to link Lab Incharge to either Teacher or Technical Staff
CREATE TABLE IF NOT EXISTS LabIncharges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lab_id INT NOT NULL,
  staff_id INT NOT NULL, -- ID from Teachers or TechnicalStaff table
  staff_type ENUM('teacher', 'technical') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lab_id) REFERENCES Labs(id) ON DELETE CASCADE,
  -- Note: cannot enforce foreign key on staff_id easily with polymorphic types in standard MySQL 
  -- without complex triggers or separate nullable columns. 
  -- Application logic must ensure validity.
  INDEX idx_staff (staff_id, staff_type)
);
