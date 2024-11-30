-- CreateTable
CREATE TABLE `vehicles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `plate` VARCHAR(191) NOT NULL,
  `model` VARCHAR(191) NOT NULL,
  `year` INTEGER NULL,
  `fuel_type` VARCHAR(191) NULL,
  `cargo_capacity` DOUBLE NULL,
  `location` VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `vehicles_plate_key`(`plate`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drivers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `cpf` VARCHAR(191) NOT NULL,
  `cnh_category` VARCHAR(191) NULL,
  `cnh_number` VARCHAR(191) NULL,
  `cnh_expiration` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `drivers_cpf_key`(`cpf`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routes` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `origin_state` VARCHAR(191) NOT NULL,
  `destination_state` VARCHAR(191) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trips` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `competence_month` VARCHAR(191) NOT NULL,
  `departure_date` DATETIME(3) NOT NULL,
  `route_id` VARCHAR(191) NOT NULL,
  `vehicle_id` INTEGER NOT NULL,
  `driver_id` INTEGER NOT NULL,
  `initial_km` DOUBLE NOT NULL,
  `final_km` DOUBLE NULL,
  `service_start` DATETIME(3) NOT NULL,
  `service_end` DATETIME(3) NULL,
  `task_id` VARCHAR(191) NULL,
  `invoice_number` VARCHAR(191) NULL,
  `delivery_status` BOOLEAN NOT NULL DEFAULT false,
  `manifest_number` VARCHAR(191) NULL,
  `items_quantity` INTEGER NULL,
  `invoice_total` DOUBLE NULL,
  `cubic_meters` DOUBLE NULL,
  `logistics_cost` DOUBLE NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuel_records` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `trip_id` INTEGER NOT NULL,
  `vehicle_id` INTEGER NOT NULL,
  `liters` DOUBLE NOT NULL,
  `fuel_type` VARCHAR(191) NOT NULL,
  `price_per_liter` DOUBLE NOT NULL,
  `total_cost` DOUBLE NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_route_id_fkey` FOREIGN KEY (`route_id`) REFERENCES `routes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fuel_records` ADD CONSTRAINT `fuel_records_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fuel_records` ADD CONSTRAINT `fuel_records_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;