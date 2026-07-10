# 🏗️ NIHONGOQUEST MASTER ARCHITECTURE PLAN

**Date:** June 30, 2026  
**Scope:** Complete production infrastructure with DevOps, learning curriculum, and game levels  
**Goal:** Enterprise-grade Japanese learning platform with 6 games, automated deployment, and structured curriculum  

---

## 📋 **EXECUTIVE SUMMARY**

This plan transforms NihongoQuest from a basic Flutter app into a **production-grade learning platform** with:

1. ✅ **6 Complete Games** - All with progress tracking, tutorials, and persistence
2. 🚀 **Infrastructure as Code** - Terraform/OpenTofu for reproducible deployments
3. 🐳 **Containerization** - Docker for consistent environments
4. ☸️ **Kubernetes Deployment** - Helm charts for scalable hosting
5. 📚 **Learning Curriculum** - Living Language Japanese (40 lessons) integrated with game levels

**Timeline:** 2-3 weeks for full implementation  
**Current Status:** Phase 1 (games) 60% complete  

---

## 🎯 **COMPONENT 1: COMPLETE ALL 6 GAMES**

### **Status:**
- ✅ **Hiragana Match** - Progress tracking + tutorial complete
- ✅ **Katakana Match** - Progress tracking complete
- 🚧 **Memory Card Game** - Needs progress integration
- 🚧 **Character Trace** - Needs progress integration
- 🚧 **Puzzle Slide** - Needs progress integration
- 🚧 **Fast Tap** - Needs progress integration

### **Immediate Tasks (2-3 hours):**

#### **Game 2: Memory Card Game**
```dart
// Add to memory_card_game_screen.dart
final ProgressService _progressService = ProgressService();
int _highScore = 0;
int _bestMoves = 0;

// On game start
await _progressService.incrementGamesPlayed('memory_game');
_highScore = await _progressService.getHighScore('memory_game');
_bestMoves = await _progressService.getBestTime('memory_game'); // stores as moves

// On win
await _progressService.saveHighScore('memory_game', _score);
await _progressService.saveBestTime('memory_game', _moves);
await _progressService.incrementWins('memory_game');
```

#### **Game 3: Character Trace**
```dart
// Track completion count instead of score
await _progressService.incrementWins('character_trace');
final completions = await _progressService.getWinCount('character_trace');
```

#### **Game 4: Puzzle Slide**
```dart
// Track best move count
await _progressService.saveBestTime('puzzle_slide', _moves);
```

#### **Game 5: Fast Tap**
```dart
// Track high score + best time
await _progressService.saveHighScore('fast_tap', _score);
await _progressService.saveBestTime('fast_tap', _timeRemaining);
```

---

## 🛠️ **COMPONENT 2: INFRASTRUCTURE AS CODE (TERRAFORM/OPENTOFU)**

### **Project Structure:**
```
infrastructure/
├── terraform/                    # or opentofu/
│   ├── main.tf                   # Root configuration
│   ├── variables.tf              # Input variables
│   ├── outputs.tf                # Output values
│   ├── versions.tf               # Provider versions
│   ├── modules/
│   │   ├── firebase/             # Firebase resources
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── hosting/              # Firebase Hosting
│   │   ├── firestore/            # Firestore database
│   │   ├── storage/              # Cloud Storage
│   │   └── functions/            # Cloud Functions
│   ├── environments/
│   │   ├── dev/
│   │   │   └── terraform.tfvars
│   │   ├── staging/
│   │   │   └── terraform.tfvars
│   │   └── prod/
│   │       └── terraform.tfvars
│   └── backend.tf                # Remote state config
```

### **Key Resources to Provision:**

#### **Firebase (GCP):**
```hcl
# main.tf
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Firebase Hosting
resource "google_firebase_hosting_site" "nihonquest" {
  provider = google
  project  = var.project_id
  site_id  = "nihonselfpacepractic-flutter"
}

# Firestore Database
resource "google_firestore_database" "nihonquest_db" {
  project     = var.project_id
  name        = "(default)"
  location_id = "us-central"
  type        = "FIRESTORE_NATIVE"
}

# Cloud Storage Bucket
resource "google_storage_bucket" "assets" {
  name          = "${var.project_id}-assets"
  location      = "US"
  force_destroy = false
  
  uniform_bucket_level_access = true
  
  cors {
    origin          = ["https://nihonselfpacepractic-flutter.web.app"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}
```

#### **Variables:**
```hcl
# variables.tf
variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default     = "nihonselfpacepractic-flutter"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment (dev/staging/prod)"
  type        = string
}
```

---

## 🐳 **COMPONENT 3: DOCKER & CONTAINERIZATION**

### **Docker Structure:**
```
docker/
├── flutter-web/
│   ├── Dockerfile                # Flutter web build container
│   ├── .dockerignore
│   └── nginx.conf                # Serve built Flutter web app
├── flutter-mobile/
│   ├── Dockerfile                # Flutter mobile build environment
│   └── entrypoint.sh
├── backend/
│   ├── Dockerfile                # Node.js backend (if needed)
│   └── package.json
└── docker-compose.yml            # Local development stack
```

### **Flutter Web Dockerfile:**
```dockerfile
# docker/flutter-web/Dockerfile
# Stage 1: Build Flutter web app
FROM ghcr.io/cirruslabs/flutter:3.24.0 AS build

WORKDIR /app

# Copy pubspec files
COPY pubspec.* ./

# Get dependencies
RUN flutter pub get

# Copy source
COPY . .

# Build for web (release mode)
RUN flutter build web --release --web-renderer canvaskit

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built web app
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### **nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### **docker-compose.yml (Local Dev):**
```yaml
version: '3.8'

services:
  flutter-web:
    build:
      context: ../nihon_quest_mobile
      dockerfile: ../docker/flutter-web/Dockerfile
    ports:
      - "8080:80"
    volumes:
      - ../nihon_quest_mobile:/app
    environment:
      - FLUTTER_ENV=development

  firebase-emulators:
    image: node:18-alpine
    working_dir: /app
    command: npx firebase emulators:start
    ports:
      - "4000:4000"   # Emulator UI
      - "8081:8080"   # Firestore
      - "9099:9099"   # Auth
      - "5001:5001"   # Functions
    volumes:
      - ../nihon_quest_mobile:/app
    environment:
      - FIREBASE_CONFIG=${FIREBASE_CONFIG}

networks:
  default:
    name: nihonquest-network
```

---

## ☸️ **COMPONENT 4: KUBERNETES & HELM CHARTS**

### **Helm Structure:**
```
helm/
├── nihonquest/
│   ├── Chart.yaml                # Chart metadata
│   ├── values.yaml               # Default values
│   ├── values-dev.yaml           # Dev overrides
│   ├── values-staging.yaml       # Staging overrides
│   ├── values-prod.yaml          # Production overrides
│   ├── templates/
│   │   ├── deployment.yaml       # Flutter web deployment
│   │   ├── service.yaml          # Service definition
│   │   ├── ingress.yaml          # Ingress rules
│   │   ├── configmap.yaml        # App configuration
│   │   ├── secret.yaml           # Firebase credentials
│   │   ├── hpa.yaml              # Horizontal Pod Autoscaler
│   │   └── _helpers.tpl          # Template helpers
│   └── charts/                   # Sub-charts (if any)
```

### **Chart.yaml:**
```yaml
apiVersion: v2
name: nihonquest
description: NihongoQuest - Japanese Learning Platform
type: application
version: 2.1.0
appVersion: "2.1.0"
keywords:
  - education
  - japanese
  - flutter
  - games
maintainers:
  - name: NihongoQuest Team
```

### **values.yaml:**
```yaml
replicaCount: 2

image:
  repository: gcr.io/nihonselfpacepractic-flutter/nihonquest-web
  pullPolicy: IfNotPresent
  tag: "2.1.0"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: nihonselfpacepractic-flutter.web.app
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: nihonquest-tls
      hosts:
        - nihonselfpacepractic-flutter.web.app

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

firebase:
  projectId: nihonselfpacepractic-flutter
  apiKey: ${FIREBASE_API_KEY}
  authDomain: nihonselfpacepractic-flutter.firebaseapp.com
```

### **deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "nihonquest.fullname" . }}
  labels:
    {{- include "nihonquest.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "nihonquest.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "nihonquest.selectorLabels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - name: http
          containerPort: 80
          protocol: TCP
        livenessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          {{- toYaml .Values.resources | nindent 12 }}
        env:
        - name: FIREBASE_PROJECT_ID
          valueFrom:
            configMapKeyRef:
              name: {{ include "nihonquest.fullname" . }}-config
              key: firebase.projectId
```

---

## 📚 **COMPONENT 5: LEARNING CURRICULUM INTEGRATION**

### **Curriculum Structure:**

```
lib/
├── curriculum/
│   ├── models/
│   │   ├── lesson.dart           # Lesson model
│   │   ├── phase.dart            # Phase model (0-5)
│   │   ├── curriculum.dart       # Full curriculum
│   │   └── progress.dart         # User progress
│   ├── data/
│   │   ├── living_language_data.dart   # 40 lessons from Living Language
│   │   ├── grammar_summary.dart        # §1-42 grammar reference
│   │   └── vocabulary.dart             # Vocabulary lists
│   ├── services/
│   │   ├── curriculum_service.dart     # Curriculum logic
│   │   └── level_service.dart          # Level progression
│   └── screens/
│       ├── curriculum_screen.dart      # Curriculum overview
│       ├── lesson_screen.dart          # Individual lesson
│       └── progress_screen.dart        # User progress dashboard
```

### **Lesson Model:**
```dart
// lib/curriculum/models/lesson.dart
class Lesson {
  final int number;                    // 1-40
  final Phase phase;                   // 0-5
  final String title;                  // e.g., "Days & Months"
  final List<String> topics;           // ["Numbers 1-10", "Colors"]
  final List<String> grammar;          // Grammar points
  final List<String> vocabulary;       // New words
  final String? audioUrl;              // Dialogue audio
  final String? transcript;            // Japanese text
  final List<String> exercises;        // Practice exercises
  final String? quiz;                  // Quiz ID
  final String? reviewQuiz;            // Review quiz after this lesson
  final Duration estimatedTime;        // Study time
  final int difficulty;                // 1-5
  
  // Game integration
  final List<String> recommendedGames; // Which games practice this lesson
  final Map<String, int> minScores;    // Required scores to unlock next
}
```

### **Phase Model:**
```dart
enum Phase {
  phase0('Sound & Script', 'Lessons 1-5', difficulty: 1),
  phase1('Survival Core', 'Lessons 6-9', difficulty: 2),
  phase2('Grammar Engine', 'Lessons 10-18', difficulty: 3),
  phase3('Daily Life', 'Lessons 19-26', difficulty: 4),
  phase4('Expressive Range', 'Lessons 27-33', difficulty: 5),
  phase5('Real-World', 'Lessons 34-40', difficulty: 6);
  
  final String name;
  final String lessonRange;
  final int difficulty;
  
  const Phase(this.name, this.lessonRange, {required this.difficulty});
}
```

### **Game-Curriculum Mapping:**

| Game | Curriculum Focus | Unlocks After | Practice Areas |
|------|------------------|---------------|----------------|
| **Hiragana Match** | Phase 0-1 (L1-9) | Start | Kana recognition, basic vocab |
| **Katakana Match** | Phase 0-1 (L1-9) | Start | Katakana, loan words |
| **Memory Game** | Phase 1-2 (L6-18) | Lesson 6 | Vocab retention, pairs |
| **Character Trace** | Phase 0 (L1-5) | Start | Stroke order, writing |
| **Puzzle Slide** | Phase 2-3 (L10-26) | Lesson 10 | Numbers, logic |
| **Fast Tap** | Phase 2-4 (L10-33) | Lesson 12 | Speed recognition, vocab |

### **Level Progression System:**
```dart
class LevelService {
  // Unlock criteria
  bool canPlayGame(String gameId, UserProgress progress) {
    switch (gameId) {
      case 'hiragana_match':
      case 'katakana_match':
      case 'character_trace':
        return true; // Always available
      
      case 'memory_game':
        return progress.completedLessons >= 6;
      
      case 'puzzle_slide':
        return progress.completedLessons >= 10;
      
      case 'fast_tap':
        return progress.completedLessons >= 12 &&
               progress.getGameHighScore('hiragana_match') >= 100;
      
      default:
        return false;
    }
  }
  
  // Lesson unlock
  bool canStartLesson(int lessonNumber, UserProgress progress) {
    if (lessonNumber == 1) return true;
    
    // Must complete previous lesson
    if (!progress.hasCompletedLesson(lessonNumber - 1)) return false;
    
    // Check review quiz gates
    if (lessonNumber == 10 && !progress.hasPassedQuiz('review_quiz_1')) {
      return false;
    }
    
    // Phase gates with minimum game scores
    if (lessonNumber == 19) {
      return progress.getGameHighScore('hiragana_match') >= 200 &&
             progress.getGameHighScore('memory_game') >= 150;
    }
    
    return true;
  }
}
```

---

## 🚀 **DEPLOYMENT PIPELINE**

### **CI/CD with GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
      - run: flutter pub get
      - run: flutter test
      - run: flutter analyze

  build-web:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
      - run: flutter build web --release
      - uses: actions/upload-artifact@v3
        with:
          name: web-build
          path: build/web

  deploy-firebase:
    needs: build-web
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: web-build
          path: build/web
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: nihonselfpacepractic-flutter

  build-docker:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: docker/setup-buildx-action@v2
      - uses: docker/login-action@v2
        with:
          registry: gcr.io
          username: _json_key
          password: ${{ secrets.GCP_SA_KEY }}
      - uses: docker/build-push-action@v4
        with:
          context: .
          file: docker/flutter-web/Dockerfile
          push: true
          tags: gcr.io/nihonselfpacepractic-flutter/nihonquest-web:${{ github.sha }}

  deploy-helm:
    needs: build-docker
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: azure/setup-helm@v3
      - uses: azure/setup-kubectl@v3
      - run: |
          helm upgrade --install nihonquest ./helm/nihonquest \
            --namespace production \
            --create-namespace \
            --values ./helm/nihonquest/values-prod.yaml \
            --set image.tag=${{ github.sha }}
```

---

## 📊 **IMPLEMENTATION TIMELINE**

### **Week 1: Core Games Completion**
- Day 1-2: Complete progress integration for games 2-5
- Day 3-4: Add tutorials to all games
- Day 5-7: Testing, bug fixes, polish

### **Week 2: Infrastructure Setup**
- Day 1-2: Terraform/OpenTofu setup (Firebase resources)
- Day 3-4: Docker containerization
- Day 5-7: Helm charts + local Kubernetes testing

### **Week 3: Curriculum Integration**
- Day 1-3: Curriculum models + data structure
- Day 4-5: Level service + progression logic
- Day 6-7: UI screens + game-lesson integration

### **Week 4: Deployment & Polish**
- Day 1-2: CI/CD pipeline setup
- Day 3-4: Production deployment
- Day 5-7: Monitoring, documentation, handoff

---

## 🎯 **SUCCESS METRICS**

### **Technical:**
- ✅ All 6 games with progress tracking
- ✅ Infrastructure fully automated (IaC)
- ✅ Zero-downtime deployments
- ✅ < 2s page load time
- ✅ 99.9% uptime

### **User Experience:**
- ✅ Clear progression path (40 lessons)
- ✅ Gamified learning (unlock system)
- ✅ Persistent progress across devices
- ✅ Immediate feedback (scores, levels)

### **Business:**
- ✅ Scalable to 10K+ users
- ✅ Cost-effective hosting (< $50/month for 1K users)
- ✅ Easy rollbacks
- ✅ Monitoring & analytics

---

## 📁 **FINAL PROJECT STRUCTURE**

```
NihonSelfPace/
├── nihon_quest_mobile/           # Flutter app
│   ├── lib/
│   │   ├── main.dart
│   │   ├── game/                 # Existing games
│   │   ├── curriculum/           # NEW: Learning curriculum
│   │   ├── models/
│   │   ├── services/
│   │   ├── screens/
│   │   └── widgets/
│   ├── test/
│   ├── pubspec.yaml
│   └── firebase.json
├── infrastructure/               # NEW: IaC
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── modules/
│   │   └── environments/
│   └── scripts/
├── docker/                       # NEW: Containers
│   ├── flutter-web/
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   └── docker-compose.yml
├── helm/                         # NEW: Kubernetes
│   └── nihonquest/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
├── .github/                      # NEW: CI/CD
│   └── workflows/
│       ├── deploy.yml
│       └── test.yml
└── docs/                         # Documentation
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    └── CURRICULUM.md
```

---

## 🚀 **NEXT STEPS**

**I'll now implement in this order:**

1. ✅ Complete game progress integration (2-3 hours)
2. ✅ Create Terraform/OpenTofu infrastructure (2-3 hours)
3. ✅ Build Docker containers (1-2 hours)
4. ✅ Create Helm charts (2-3 hours)
5. ✅ Integrate curriculum structure (3-4 hours)
6. ✅ Setup CI/CD pipeline (2-3 hours)
7. ✅ Deploy to production (1 hour)

**Total estimated time: 14-20 hours** over 2-3 weeks.

**Ready to start implementing? I'll begin with completing the games!** 🎮
