import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const NihonQuestApp());
}

class NihonQuestApp extends StatelessWidget {
  const NihonQuestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NihongoQuest',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.purple,
          primary: Colors.purple,
          secondary: Colors.pink,
        ),
        textTheme: GoogleFonts.quicksandTextTheme(),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

