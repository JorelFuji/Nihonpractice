# NihongoQuest Infrastructure - Variables

variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default     = "nihonselfpacepractic-flutter"
}

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment name (dev/staging/prod)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# Firebase Hosting
variable "hosting_site_id" {
  description = "Firebase Hosting site ID"
  type        = string
  default     = "nihonselfpacepractic-flutter"
}

# Firestore
variable "firestore_database_name" {
  description = "Firestore database name"
  type        = string
  default     = "(default)"
}

variable "firestore_location" {
  description = "Firestore location"
  type        = string
  default     = "us-central"
}

# Cloud Storage
variable "storage_bucket_name" {
  description = "Cloud Storage bucket name"
  type        = string
  default     = "nihonquest-assets"
}

variable "storage_location" {
  description = "Cloud Storage location"
  type        = string
  default     = "US"
}

variable "cors_origins" {
  description = "CORS allowed origins"
  type        = list(string)
  default     = [
    "https://nihonselfpacepractic-flutter.web.app",
    "https://nihonselfpacepractic-flutter.firebaseapp.com"
  ]
}

# Tags
variable "labels" {
  description = "Resource labels"
  type        = map(string)
  default     = {}
}
