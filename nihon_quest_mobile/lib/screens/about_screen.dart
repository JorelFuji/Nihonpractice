import 'package:flutter/material.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('About'),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE1F5FE),
              Color(0xFFB3E5FC),
              Color(0xFF81D4FA),
            ],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Logo and Title
                Center(
                  child: Column(
                    children: [
                      const Text(
                        '🌸',
                        style: TextStyle(fontSize: 80),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        '日本語クエスト',
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                          color: Colors.purple,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 5),
                      Text(
                        'NihongoQuest Mobile',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.grey[700],
                        ),
                      ),
                      const SizedBox(height: 30),
                    ],
                  ),
                ),

                // Company Info Card
                _buildInfoCard(
                  icon: Icons.business,
                  title: 'Company',
                  content: 'Osaka Oaks LLC',
                  subtitle: 'Service-Disabled Veteran-Owned Small Business (SDVOSB)',
                  color: Colors.blue,
                ),
                const SizedBox(height: 15),

                // Copyright Card
                _buildInfoCard(
                  icon: Icons.copyright,
                  title: 'Copyright',
                  content: '© ${DateTime.now().year} Osaka Oaks LLC',
                  subtitle: 'All rights reserved. This application is proprietary software owned and operated by Osaka Oaks LLC.',
                  color: Colors.purple,
                ),
                const SizedBox(height: 15),

                // Contact Card
                _buildInfoCard(
                  icon: Icons.email,
                  title: 'Contact',
                  content: 'melvin.j.spiller@gmail.com',
                  subtitle: 'DUNS: 132737694\nUEI: MUGPMK51DFB4\nNAICS: 541512',
                  color: Colors.green,
                ),
                const SizedBox(height: 15),

                // Version Card
                _buildInfoCard(
                  icon: Icons.info,
                  title: 'Version',
                  content: '1.0.0',
                  subtitle: 'Flutter Mobile Games Platform',
                  color: Colors.orange,
                ),
                const SizedBox(height: 30),

                // Legal Notice
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.red[50],
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(color: Colors.red[300]!, width: 2),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.shield, color: Colors.red[700], size: 24),
                          const SizedBox(width: 10),
                          Text(
                            'Legal Notice',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.red[700],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        'Unauthorized reproduction, distribution, or use of this software is strictly prohibited and may be subject to civil and criminal penalties.',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.red[900],
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Made with Love
                Center(
                  child: Column(
                    children: [
                      Text(
                        '🇺🇸 Veteran-Owned',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[700],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        '🔒 Secure by Design',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[700],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        'Made with ❤️ for Japanese Learners',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[700],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInfoCard({
    required IconData icon,
    required String title,
    required String content,
    required String subtitle,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: color, width: 2),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.2),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 10),
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            content,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 13,
              color: Colors.grey[700],
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}
