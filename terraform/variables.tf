variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default     = "nihonselfpacepractic"
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP Zone"
  type        = string
  default     = "us-central1-a"
}

variable "cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "nihon-quest-cluster"
}

variable "node_count" {
  description = "Number of nodes in the cluster"
  type        = number
  default     = 3
}

variable "machine_type" {
  description = "Machine type for nodes"
  type        = string
  default     = "e2-medium"
}

variable "min_node_count" {
  description = "Minimum number of nodes"
  type        = number
  default     = 3
}

variable "max_node_count" {
  description = "Maximum number of nodes"
  type        = number
  default     = 10
}

variable "environment" {
  description = "Environment (dev, staging, production)"
  type        = string
  default     = "production"
}
