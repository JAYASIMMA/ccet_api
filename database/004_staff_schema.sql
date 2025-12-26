-- Technical Staff Tables
CREATE TABLE IF NOT EXISTS TechnicalStaff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(100) DEFAULT 'technical-staff',
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TechnicalStaffProfiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  phone_number VARCHAR(20),
  specialization VARCHAR(255),
  FOREIGN KEY (staff_id) REFERENCES TechnicalStaff(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TechnicalStaffAttendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late', 'Leave') NOT NULL,
  remarks VARCHAR(255),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES TechnicalStaff(id) ON DELETE CASCADE
);

-- Non-Technical Staff Tables
CREATE TABLE IF NOT EXISTS NonTechnicalStaff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(100) DEFAULT 'non-technical-staff',
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS NonTechnicalStaffProfiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  phone_number VARCHAR(20),
  designation VARCHAR(255),
  FOREIGN KEY (staff_id) REFERENCES NonTechnicalStaff(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS NonTechnicalStaffAttendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late', 'Leave') NOT NULL,
  remarks VARCHAR(255),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES NonTechnicalStaff(id) ON DELETE CASCADE
);
