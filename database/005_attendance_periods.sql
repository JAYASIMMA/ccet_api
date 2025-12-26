-- Add period column to StudentAttendance
-- We check if column exists first to avoid errors, or just use simple ALTER which might fail if run twice. 
-- For simplicity in this setup env, we'll try to add it.

ALTER TABLE StudentAttendance
ADD COLUMN period VARCHAR(50) DEFAULT 'Day';

-- Optional: Add subject_id if we want to link attendance to a specific subject period
ALTER TABLE StudentAttendance
ADD COLUMN subject_id INT NULL;

ALTER TABLE StudentAttendance
ADD FOREIGN KEY (subject_id) REFERENCES ClassAssignments(id) ON DELETE SET NULL;
