import 'package:flutter/material.dart';

class TutorialDialog extends StatelessWidget {
  final String gameName;
  final List<TutorialStep> steps;
  final IconData? icon;
  final Color? color;

  const TutorialDialog({
    super.key,
    required this.gameName,
    required this.steps,
    this.icon,
    this.color,
  });

  static Future<void> show(
    BuildContext context, {
    required String gameName,
    required List<TutorialStep> steps,
    IconData? icon,
    Color? color,
  }) {
    return showDialog(
      context: context,
      builder: (context) => TutorialDialog(
        gameName: gameName,
        steps: steps,
        icon: icon,
        color: color,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Row(
        children: [
          if (icon != null) ...[
            Icon(icon, color: color ?? Colors.blue, size: 32),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: Text(
              '📚 How to Play\n$gameName',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: color ?? Colors.blue,
              ),
            ),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ...steps.asMap().entries.map((entry) {
              final index = entry.key;
              final step = entry.value;
              return Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        color: color?.withOpacity(0.2) ?? Colors.blue.withOpacity(0.2),
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: color ?? Colors.blue,
                          width: 2,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          '${index + 1}',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: color ?? Colors.blue,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (step.emoji != null)
                            Text(
                              step.emoji!,
                              style: const TextStyle(fontSize: 24),
                            ),
                          Text(
                            step.text,
                            style: const TextStyle(
                              fontSize: 16,
                              height: 1.4,
                            ),
                          ),
                          if (step.hint != null) ...[
                            const SizedBox(height: 4),
                            Text(
                              '💡 ${step.hint}',
                              style: TextStyle(
                                fontSize: 13,
                                color: Colors.grey[600],
                                fontStyle: FontStyle.italic,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
            const Divider(),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.green.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.green, width: 2),
              ),
              child: const Row(
                children: [
                  Icon(Icons.emoji_events, color: Colors.green, size: 24),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Have fun and learn!',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          style: TextButton.styleFrom(
            backgroundColor: color?.withOpacity(0.1) ?? Colors.blue.withOpacity(0.1),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
          child: Text(
            'Got it! 🎮',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: color ?? Colors.blue,
            ),
          ),
        ),
      ],
    );
  }
}

class TutorialStep {
  final String text;
  final String? emoji;
  final String? hint;

  const TutorialStep({
    required this.text,
    this.emoji,
    this.hint,
  });
}
