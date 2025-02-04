CREATE TABLE `work_tracker` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`ot_number` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`dedicated_hours` integer NOT NULL,
	`quantity_persons` integer NOT NULL,
	`location` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
