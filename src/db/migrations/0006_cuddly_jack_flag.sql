PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_aditional_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`comments` text,
	`execution_date` text NOT NULL,
	`activity_start_time` text NOT NULL,
	`activity_end_time` text NOT NULL,
	`activity_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` integer NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_aditional_activity`("id", "comments", "execution_date", "activity_start_time", "activity_end_time", "activity_name", "created_at", "updated_at", "work_book_id") SELECT "id", "comments", "execution_date", "activity_start_time", "activity_end_time", "activity_name", "created_at", "updated_at", "work_book_id" FROM `aditional_activity`;--> statement-breakpoint
DROP TABLE `aditional_activity`;--> statement-breakpoint
ALTER TABLE `__new_aditional_activity` RENAME TO `aditional_activity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_daily_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`comments` text NOT NULL,
	`execution_date` text NOT NULL,
	`activity_start_time` text NOT NULL,
	`activity_end_time` text NOT NULL,
	`activity_name` text NOT NULL,
	`personnel` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` integer NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_daily_activity`("id", "comments", "execution_date", "activity_start_time", "activity_end_time", "activity_name", "personnel", "created_at", "updated_at", "work_book_id") SELECT "id", "comments", "execution_date", "activity_start_time", "activity_end_time", "activity_name", "personnel", "created_at", "updated_at", "work_book_id" FROM `daily_activity`;--> statement-breakpoint
DROP TABLE `daily_activity`;--> statement-breakpoint
ALTER TABLE `__new_daily_activity` RENAME TO `daily_activity`;--> statement-breakpoint
CREATE TABLE `__new_otc_inspector` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inspector_name` text NOT NULL,
	`date_of_execution` text NOT NULL,
	`activity_start_time` text NOT NULL,
	`activity_end_time` text NOT NULL,
	`supervision_comments` text NOT NULL,
	`safety_observations` text NOT NULL,
	`non_conformities` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` integer NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_otc_inspector`("id", "inspector_name", "date_of_execution", "activity_start_time", "activity_end_time", "supervision_comments", "safety_observations", "non_conformities", "created_at", "updated_at", "work_book_id") SELECT "id", "inspector_name", "date_of_execution", "activity_start_time", "activity_end_time", "supervision_comments", "safety_observations", "non_conformities", "created_at", "updated_at", "work_book_id" FROM `otc_inspector`;--> statement-breakpoint
DROP TABLE `otc_inspector`;--> statement-breakpoint
ALTER TABLE `__new_otc_inspector` RENAME TO `otc_inspector`;--> statement-breakpoint
CREATE TABLE `__new_prevention_area` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`recommendations` text,
	`others` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` integer NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_prevention_area`("id", "name", "recommendations", "others", "created_at", "updated_at", "work_book_id") SELECT "id", "name", "recommendations", "others", "created_at", "updated_at", "work_book_id" FROM `prevention_area`;--> statement-breakpoint
DROP TABLE `prevention_area`;--> statement-breakpoint
ALTER TABLE `__new_prevention_area` RENAME TO `prevention_area`;