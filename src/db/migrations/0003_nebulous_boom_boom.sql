PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_work_tracker` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
--> statement-breakpoint
INSERT INTO `__new_work_tracker`("id", "user_id", "ot_number", "description", "date", "dedicated_hours", "quantity_persons", "location", "status", "created_at", "updated_at") SELECT "id", "user_id", "ot_number", "description", "date", "dedicated_hours", "quantity_persons", "location", "status", "created_at", "updated_at" FROM `work_tracker`;--> statement-breakpoint
DROP TABLE `work_tracker`;--> statement-breakpoint
ALTER TABLE `__new_work_tracker` RENAME TO `work_tracker`;--> statement-breakpoint
PRAGMA foreign_keys=ON;