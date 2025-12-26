-- Alter Admins table to support 'transport-admin'
-- Note: MODIFY COLUMN ENUM usually requires listing all options again
ALTER TABLE Admins
MODIFY COLUMN role ENUM('admin', 'super-admin', 'transport-admin') DEFAULT 'admin';

-- Create Transport Maintenance Table
CREATE TABLE IF NOT EXISTS TransportMaintenance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_number VARCHAR(50) NOT NULL,
  driver_id INT NOT NULL,
  last_service_date DATE,
  next_service_date DATE,
  status ENUM('Active', 'Maintenance', 'Inactive') DEFAULT 'Active',
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES NonTechnicalStaff(id) ON DELETE CASCADE
);
