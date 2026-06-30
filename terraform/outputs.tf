output "cluster_name" {
  description = "GKE Cluster Name"
  value       = google_container_cluster.primary.name
}

output "cluster_endpoint" {
  description = "GKE Cluster Endpoint"
  value       = google_container_cluster.primary.endpoint
  sensitive   = true
}

output "cluster_ca_certificate" {
  description = "GKE Cluster CA Certificate"
  value       = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
  sensitive   = true
}

output "region" {
  description = "GCP Region"
  value       = var.region
}

output "project_id" {
  description = "GCP Project ID"
  value       = var.project_id
}

output "vpc_name" {
  description = "VPC Network Name"
  value       = google_compute_network.vpc.name
}

output "subnet_name" {
  description = "Subnet Name"
  value       = google_compute_subnetwork.subnet.name
}

output "service_account_email" {
  description = "Service Account Email"
  value       = google_service_account.gke_sa.email
}
