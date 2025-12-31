CREATE TABLE submissions (
  id CHAR(32) PRIMARY KEY,
  created_at DATETIME NOT NULL,
  form_type VARCHAR(32) NOT NULL,
  payload_json JSON NOT NULL,
  snapshot_url TEXT NULL,
  snapshot_key TEXT NULL,
  snapshot_checksum CHAR(64) NULL,
  snapshot_status VARCHAR(16) NOT NULL DEFAULT 'pending',
  notification_status VARCHAR(16) NOT NULL DEFAULT 'pending',
  notification_response TEXT NULL
);

CREATE TABLE submission_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id CHAR(32) NOT NULL,
  event_type VARCHAR(32) NOT NULL,
  event_meta JSON NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (submission_id) REFERENCES submissions(id)
);
