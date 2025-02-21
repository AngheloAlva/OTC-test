PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_documents_subgroup` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`documents_group` integer NOT NULL,
	FOREIGN KEY (`documents_group`) REFERENCES `documents_group`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_documents_subgroup`("id", "name", "description", "created_at", "updated_at", "documents_group") SELECT "id", "name", "description", "created_at", "updated_at", "documents_group" FROM `documents_subgroup`;--> statement-breakpoint
DROP TABLE `documents_subgroup`;--> statement-breakpoint
ALTER TABLE `__new_documents_subgroup` RENAME TO `documents_subgroup`;--> statement-breakpoint
PRAGMA foreign_keys=ON;