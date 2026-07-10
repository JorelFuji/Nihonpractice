# NihongoQuest Infrastructure - Main Configuration
# Terraform/OpenTofu compatible

terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
  
  backend "gcs" {
    bucket = "nihonquest-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# Local values
locals {
  common_labels = {
    app         = "nihonquest"
    environment = var.environment
    managed_by  = "terraform"
    project     = "japanese-learning"
  }
}

# Firebase Hosting Module
module "firebase_hosting" {
  source = "./modules/hosting"
  
  project_id  = var.project_id
  site_id     = var.hosting_site_id
  labels      = local.common_labels
}

# Firestore Database Module
module "firestore" {
  source = "./modules/firestore"
  
  project_id    = var.project_id
  database_name = var.firestore_database_name
  location      = var.firestore_location
  labels        = local.common_labels
}

# Cloud Storage Module
module "storage" {
  source = "./modules/storage"
  
  project_id    = var.project_id
  bucket_name   = var.storage_bucket_name
  location      = var.storage_location
  cors_origins  = var.cors_origins
  labels        = local.common_labels
}

# Firebase Module (Authentication, etc.)
module "firebase" {
  source = "./modules/firebase"
  
  project_id = var.project_id
  labels     = local.common_labels
}
