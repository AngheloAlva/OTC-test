CREATE TABLE `aditional_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`comments` text,
	`execution_date` text NOT NULL,
	`activity_start_time` text NOT NULL,
	`activity_end_time` text NOT NULL,
	`activity_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` text NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `daily_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`comments` text NOT NULL,
	`execution_date` text NOT NULL,
	`activity_start_time` text NOT NULL,
	`activity_end_time` text NOT NULL,
	`activity_name` text NOT NULL,
	`personnel` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` text NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `document` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`file_url` text NOT NULL,
	`expiration_date` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`subgroup_id` integer NOT NULL,
	`user_id` text,
	FOREIGN KEY (`subgroup_id`) REFERENCES `documents_subgroup`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `documents_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `documents_subgroup` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`documents_group` text NOT NULL,
	FOREIGN KEY (`documents_group`) REFERENCES `documents_group`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `otc_inspector` (
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
	`work_book_id` text NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prevention_area` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`recommendations` text,
	`others` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`work_book_id` text NOT NULL,
	FOREIGN KEY (`work_book_id`) REFERENCES `work_book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `work_book` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`ot_number` text NOT NULL,
	`contracting_company` text NOT NULL,
	`work_responsible_name` text NOT NULL,
	`work_responsible_phone` text NOT NULL,
	`work_name` text NOT NULL,
	`location` text NOT NULL,
	`work_type` text NOT NULL,
	`initial_date` text NOT NULL,
	`estimated_end_date` text NOT NULL,
	`status` text NOT NULL,
	`progress_status` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `work_book_ot_number_unique` ON `work_book` (`ot_number`);