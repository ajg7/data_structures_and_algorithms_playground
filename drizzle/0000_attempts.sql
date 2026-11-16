CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`lab` text NOT NULL,
	`milestone` text,
	`score` real,
	`confidence` integer,
	`payload` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `attempts_lab_kind_idx` ON `attempts` (`lab`,`kind`);