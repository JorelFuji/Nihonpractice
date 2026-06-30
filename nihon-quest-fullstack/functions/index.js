/**
 * Firebase Cloud Functions
 * Cron jobs, scheduled tasks, and monitoring
 */

import { onSchedule } from 'firebase-functions/v2/scheduler'
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()
const db = getFirestore()

/**
 * Health Check Endpoint
 * GET /healthCheck
 */
export const healthCheck = onRequest(async (req, res) => {
  try {
    const startTime = Date.now()

    // Check Firestore connection
    await db.collection('health').doc('check').set({
      timestamp: new Date(),
      status: 'healthy',
    })

    const responseTime = Date.now() - startTime

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      services: {
        firestore: 'operational',
        functions: 'operational',
      },
    })
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
    })
  }
})

/**
 * Daily User Stats Cron Job
 * Runs every day at midnight UTC
 */
export const dailyUserStats = onSchedule('0 0 * * *', async (event) => {
  console.log('Running daily user stats...')

  try {
    const usersSnapshot = await db.collection('users').get()
    const activeUsers = usersSnapshot.docs.filter((doc) => {
      const lastActive = doc.data().lastActive
      if (!lastActive) return false
      const daysSinceActive = (Date.now() - lastActive.toMillis()) / (1000 * 60 * 60 * 24)
      return daysSinceActive < 7
    })

    const stats = {
      totalUsers: usersSnapshot.size,
      activeUsers: activeUsers.length,
      timestamp: new Date(),
    }

    await db.collection('analytics').doc('daily-stats').set(stats)

    console.log('Daily stats updated:', stats)
  } catch (error) {
    console.error('Error updating daily stats:', error)
  }
})

/**
 * Weekly Progress Report Cron Job
 * Runs every Monday at 9 AM UTC
 */
export const weeklyProgressReport = onSchedule('0 9 * * 1', async (event) => {
  console.log('Generating weekly progress report...')

  try {
    const usersSnapshot = await db.collection('users').get()
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    let totalLessonsCompleted = 0
    let totalStudyTime = 0

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data()
      const progress = userData.progress || {}

      // Count lessons completed this week
      if (progress.lastLessonDate && progress.lastLessonDate.toDate() > weekAgo) {
        totalLessonsCompleted += progress.lessonsThisWeek || 0
      }

      // Sum study time
      totalStudyTime += progress.studyTimeThisWeek || 0
    }

    const report = {
      weekOf: weekAgo,
      totalUsers: usersSnapshot.size,
      totalLessonsCompleted,
      totalStudyTime,
      averageStudyTime: totalStudyTime / usersSnapshot.size,
      timestamp: new Date(),
    }

    await db.collection('analytics').doc('weekly-report').set(report)

    console.log('Weekly report generated:', report)
  } catch (error) {
    console.error('Error generating weekly report:', error)
  }
})

/**
 * Cleanup Old Sessions Cron Job
 * Runs every day at 2 AM UTC
 */
export const cleanupOldSessions = onSchedule('0 2 * * *', async (event) => {
  console.log('Cleaning up old sessions...')

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const oldSessions = await db
      .collection('sessions')
      .where('createdAt', '<', thirtyDaysAgo)
      .get()

    const batch = db.batch()
    oldSessions.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()

    console.log(`Deleted ${oldSessions.size} old sessions`)
  } catch (error) {
    console.error('Error cleaning up sessions:', error)
  }
})

/**
 * Monitor Application Performance
 * Runs every hour
 */
export const monitorPerformance = onSchedule('0 * * * *', async (event) => {
  console.log('Monitoring application performance...')

  try {
    // Check response times
    const startTime = Date.now()
    await db.collection('health').doc('monitor').get()
    const firestoreLatency = Date.now() - startTime

    // Log performance metrics
    await db.collection('performance').add({
      timestamp: new Date(),
      firestoreLatency,
      status: firestoreLatency < 1000 ? 'good' : 'slow',
    })

    // Alert if performance is degraded
    if (firestoreLatency > 2000) {
      console.warn('⚠️ High Firestore latency detected:', firestoreLatency, 'ms')
    }
  } catch (error) {
    console.error('Error monitoring performance:', error)
  }
})

/**
 * Backup User Progress
 * Runs every day at 3 AM UTC
 */
export const backupUserProgress = onSchedule('0 3 * * *', async (event) => {
  console.log('Backing up user progress...')

  try {
    const usersSnapshot = await db.collection('users').get()
    const backup = {
      timestamp: new Date(),
      userCount: usersSnapshot.size,
      users: usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        progress: doc.data().progress,
        stats: doc.data().stats,
      })),
    }

    const backupDate = new Date().toISOString().split('T')[0]
    await db.collection('backups').doc(backupDate).set(backup)

    console.log(`Backup completed: ${usersSnapshot.size} users`)
  } catch (error) {
    console.error('Error backing up user progress:', error)
  }
})

/**
 * Send Daily Reminders
 * Runs every day at 10 AM UTC (for users who haven't studied)
 */
export const sendDailyReminders = onSchedule('0 10 * * *', async (event) => {
  console.log('Sending daily reminders...')

  try {
    const usersSnapshot = await db.collection('users').get()
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

    let remindersSent = 0

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data()
      const lastActive = userData.lastActive

      // If user hasn't been active in 24 hours
      if (!lastActive || lastActive.toDate() < yesterday) {
        // Store reminder (actual sending would be done via FCM or email service)
        await db.collection('reminders').add({
          userId: doc.id,
          type: 'daily-study',
          sentAt: new Date(),
          status: 'pending',
        })

        remindersSent++
      }
    }

    console.log(`Sent ${remindersSent} reminders`)
  } catch (error) {
    console.error('Error sending reminders:', error)
  }
})
