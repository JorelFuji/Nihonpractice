# 🏗️ Infrastructure Documentation

Complete guide for Docker, Kubernetes, Helm, Terraform/OpenTofu, and CI/CD.

---

## 📋 **Table of Contents**

1. [Docker](#docker)
2. [Kubernetes](#kubernetes)
3. [Helm Charts](#helm-charts)
4. [Terraform/OpenTofu](#terraformopentofu)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Cron Jobs](#cron-jobs)
7. [Monitoring](#monitoring)

---

## 🐳 **Docker**

### **Dockerfile**

Multi-stage build for optimized image size:

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Build and Run**

```bash
# Build image
docker build -t nihon-quest:latest -f nihon-quest-fullstack/Dockerfile nihon-quest-fullstack

# Run container
docker run -d -p 8080:80 --name nihon-quest nihon-quest:latest

# Check logs
docker logs nihon-quest

# Stop container
docker stop nihon-quest

# Remove container
docker rm nihon-quest
```

### **Docker Compose**

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Image Registry**

```bash
# Tag image
docker tag nihon-quest:latest ghcr.io/jorelfuji/nihonpractice:latest

# Push to GitHub Container Registry
docker push ghcr.io/jorelfuji/nihonpractice:latest

# Pull image
docker pull ghcr.io/jorelfuji/nihonpractice:latest
```

---

## ☸️ **Kubernetes**

### **Architecture**

```
┌─────────────────────────────────────┐
│         Load Balancer               │
│      (Ingress Controller)           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           Ingress                   │
│    (nihonquest.com routing)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          Service                    │
│    (LoadBalancer/ClusterIP)         │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐ ┌─────▼──────┐
│   Pod 1     │ │   Pod 2    │
│ (Replica 1) │ │ (Replica 2)│
└─────────────┘ └────────────┘
```

### **Deploy to Kubernetes**

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply all manifests
kubectl apply -f k8s/

# Check deployment
kubectl get all -n nihon-quest

# View pods
kubectl get pods -n nihon-quest

# View logs
kubectl logs -f deployment/nihon-quest -n nihon-quest

# Scale deployment
kubectl scale deployment nihon-quest --replicas=5 -n nihon-quest

# Delete deployment
kubectl delete -f k8s/
```

### **Manifests**

#### **1. Namespace** (`k8s/namespace.yaml`)
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nihon-quest
```

#### **2. Deployment** (`k8s/deployment.yaml`)
- 3 replicas
- Rolling update strategy
- Health checks (liveness & readiness)
- Resource limits

#### **3. Service** (`k8s/service.yaml`)
- LoadBalancer type
- Port 80
- Session affinity

#### **4. Ingress** (`k8s/ingress.yaml`)
- HTTPS with Let's Encrypt
- Domain routing
- SSL redirect

#### **5. HPA** (`k8s/hpa.yaml`)
- Min: 3 replicas
- Max: 10 replicas
- CPU: 70% target
- Memory: 80% target

#### **6. ConfigMap** (`k8s/configmap.yaml`)
- Environment variables
- Configuration data

---

## ⎈ **Helm Charts**

### **Chart Structure**

```
helm/nihon-quest/
├── Chart.yaml              # Chart metadata
├── values.yaml             # Default values
└── templates/
    ├── deployment.yaml     # Deployment template
    ├── service.yaml        # Service template
    ├── ingress.yaml        # Ingress template
    ├── hpa.yaml            # HPA template
    └── _helpers.tpl        # Template helpers
```

### **Install with Helm**

```bash
# Add Helm repo (if using)
helm repo add nihon-quest https://charts.nihonquest.com
helm repo update

# Install chart
helm install nihon-quest ./helm/nihon-quest \
  --namespace nihon-quest \
  --create-namespace \
  --values helm/nihon-quest/values.yaml

# Upgrade release
helm upgrade nihon-quest ./helm/nihon-quest \
  --namespace nihon-quest \
  --values helm/nihon-quest/values.yaml

# Rollback release
helm rollback nihon-quest 1 -n nihon-quest

# Uninstall release
helm uninstall nihon-quest -n nihon-quest

# List releases
helm list -n nihon-quest

# Get values
helm get values nihon-quest -n nihon-quest
```

### **Custom Values**

Create `values-production.yaml`:

```yaml
replicaCount: 5

image:
  tag: "v1.0.0"

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

ingress:
  hosts:
    - host: nihonquest.com
      paths:
        - path: /
          pathType: Prefix
```

Install with custom values:

```bash
helm install nihon-quest ./helm/nihon-quest \
  -f helm/nihon-quest/values-production.yaml \
  -n nihon-quest
```

---

## 🏗️ **Terraform/OpenTofu**

### **Infrastructure as Code**

```
terraform/
├── main.tf          # Provider configuration
├── variables.tf     # Input variables
├── outputs.tf       # Output values
├── gke.tf           # GKE cluster
├── network.tf       # VPC and networking
└── terraform.tfvars # Variable values (gitignored)
```

### **Initialize Terraform**

```bash
cd terraform

# Initialize
terraform init

# Or use OpenTofu
tofu init
```

### **Plan and Apply**

```bash
# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure
terraform destroy

# Show current state
terraform show

# List resources
terraform state list
```

### **OpenTofu (Terraform alternative)**

```bash
# Install OpenTofu
brew install opentofu

# Use same commands
tofu init
tofu plan
tofu apply
```

### **Terraform Variables**

Create `terraform.tfvars`:

```hcl
project_id    = "nihonselfpacepractic"
region        = "us-central1"
cluster_name  = "nihon-quest-cluster"
node_count    = 3
machine_type  = "e2-medium"
environment   = "production"
```

### **Remote State**

Store state in Google Cloud Storage:

```hcl
terraform {
  backend "gcs" {
    bucket = "nihon-quest-terraform-state"
    prefix = "terraform/state"
  }
}
```

Create bucket:

```bash
gsutil mb gs://nihon-quest-terraform-state
gsutil versioning set on gs://nihon-quest-terraform-state
```

---

## 🔄 **CI/CD Pipeline**

### **GitHub Actions Workflow**

**File:** `.github/workflows/cicd-full.yaml`

### **Pipeline Stages**

```
1. Version Determination
   ├── Extract version from tag/commit
   └── Determine if release

2. Lint & Test
   ├── ESLint
   ├── TypeScript check
   └── Unit tests

3. Build Application
   ├── npm install
   ├── npm build
   └── Upload artifacts

4. Build Docker Image
   ├── Download artifacts
   ├── Build image
   └── Push to registry

5. Deploy
   ├── Firebase (main branch)
   └── Kubernetes (tags)

6. Health Check
   ├── Wait for deployment
   ├── Run health check
   └── Create GitHub release
```

### **Trigger Events**

- **Push to main/develop** - Full pipeline
- **Pull request** - Lint, test, build only
- **Tag push (v*)** - Full pipeline + K8s deploy

### **Required Secrets**

Configure in GitHub Settings → Secrets:

```
GITHUB_TOKEN              # Auto-provided
FIREBASE_SERVICE_ACCOUNT  # Firebase service account JSON
FIREBASE_TOKEN            # Firebase CI token
GCP_SA_KEY                # GCP service account key
```

### **Manual Trigger**

```bash
# Trigger workflow manually
gh workflow run cicd-full.yaml

# View workflow runs
gh run list

# View workflow logs
gh run view <run-id> --log
```

---

## ⏰ **Cron Jobs**

### **Firebase Functions (Existing)**

6 scheduled functions already configured:

1. **Daily User Stats** - `0 0 * * *` (Midnight UTC)
2. **Weekly Reports** - `0 9 * * 1` (Monday 9 AM)
3. **Session Cleanup** - `0 2 * * *` (2 AM UTC)
4. **Performance Monitor** - `0 * * * *` (Hourly)
5. **Daily Backups** - `0 3 * * *` (3 AM UTC)
6. **User Reminders** - `0 10 * * *` (10 AM UTC)

### **Kubernetes CronJobs**

Create `k8s/cronjob.yaml`:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-job
  namespace: nihon-quest
spec:
  schedule: "0 3 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: nihon-quest-backup:latest
            command: ["/bin/sh", "-c", "backup.sh"]
          restartPolicy: OnFailure
```

Apply:

```bash
kubectl apply -f k8s/cronjob.yaml
```

---

## 📊 **Monitoring**

### **Kubernetes Monitoring**

```bash
# View pod metrics
kubectl top pods -n nihon-quest

# View node metrics
kubectl top nodes

# View events
kubectl get events -n nihon-quest

# Describe pod
kubectl describe pod <pod-name> -n nihon-quest
```

### **Prometheus & Grafana**

Install monitoring stack:

```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack \
  -n monitoring \
  --create-namespace

# Access Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
```

### **Health Endpoints**

- **Application:** `http://localhost:80/health`
- **Firebase Function:** `https://us-central1-nihonselfpacepractic.cloudfunctions.net/healthCheck`

---

## 🚀 **Quick Commands**

### **Docker**
```bash
make docker-build    # Build image
make docker-run      # Run container
make docker-push     # Push to registry
```

### **Kubernetes**
```bash
make k8s-deploy      # Deploy to K8s
make k8s-status      # Check status
make k8s-logs        # View logs
make k8s-delete      # Delete deployment
```

### **Helm**
```bash
make helm-install    # Install chart
make helm-upgrade    # Upgrade release
make helm-rollback   # Rollback release
make helm-uninstall  # Uninstall release
```

### **Terraform**
```bash
make tf-init         # Initialize Terraform
make tf-plan         # Plan changes
make tf-apply        # Apply changes
make tf-destroy      # Destroy infrastructure
```

---

## 📝 **Best Practices**

### **Docker**
- ✅ Use multi-stage builds
- ✅ Minimize image size
- ✅ Use .dockerignore
- ✅ Run as non-root user
- ✅ Scan for vulnerabilities

### **Kubernetes**
- ✅ Use namespaces
- ✅ Set resource limits
- ✅ Implement health checks
- ✅ Use HPA for scaling
- ✅ Enable network policies

### **Helm**
- ✅ Version charts properly
- ✅ Use values files for environments
- ✅ Test before deploying
- ✅ Document chart usage
- ✅ Use chart dependencies

### **Terraform**
- ✅ Use remote state
- ✅ Enable state locking
- ✅ Use workspaces for environments
- ✅ Version modules
- ✅ Review plans before applying

### **CI/CD**
- ✅ Test before deploy
- ✅ Use staging environment
- ✅ Implement rollback strategy
- ✅ Monitor deployments
- ✅ Automate everything

---

## ✅ **Summary**

You now have:

- ✅ **Docker** - Containerized application
- ✅ **Kubernetes** - Orchestration and scaling
- ✅ **Helm** - Package management
- ✅ **Terraform/OpenTofu** - Infrastructure as code
- ✅ **CI/CD** - Automated pipeline
- ✅ **Cron Jobs** - Scheduled tasks
- ✅ **Monitoring** - Health and metrics

**Production-ready infrastructure!** 🚀
