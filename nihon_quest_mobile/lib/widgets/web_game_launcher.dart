import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebGameLauncher extends StatefulWidget {
  final String gameUrl;
  final String gameTitle;
  final Color themeColor;
  final String? emoji;

  const WebGameLauncher({
    super.key,
    required this.gameUrl,
    required this.gameTitle,
    this.themeColor = Colors.purple,
    this.emoji,
  });

  @override
  State<WebGameLauncher> createState() => _WebGameLauncherState();
}

class _WebGameLauncherState extends State<WebGameLauncher> {
  late final WebViewController controller;
  bool isLoading = true;
  double loadingProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _initializeWebView();
  }

  void _initializeWebView() {
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              loadingProgress = progress / 100;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              isLoading = true;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              isLoading = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebView error: ${error.description}');
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.gameUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.emoji != null) ...[
              Text(
                widget.emoji!,
                style: const TextStyle(fontSize: 24),
              ),
              const SizedBox(width: 8),
            ],
            Flexible(
              child: Text(
                widget.gameTitle,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
        backgroundColor: widget.themeColor,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => controller.reload(),
            tooltip: 'Reload Game',
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              switch (value) {
                case 'home':
                  Navigator.of(context).popUntil((route) => route.isFirst);
                  break;
                case 'fullscreen':
                  _toggleFullscreen();
                  break;
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'home',
                child: Row(
                  children: [
                    Icon(Icons.home, size: 20),
                    SizedBox(width: 8),
                    Text('Home'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'fullscreen',
                child: Row(
                  children: [
                    Icon(Icons.fullscreen, size: 20),
                    SizedBox(width: 8),
                    Text('Fullscreen'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: Stack(
        children: [
          WebViewWidget(controller: controller),
          if (isLoading)
            Container(
              color: widget.themeColor.withOpacity(0.1),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (widget.emoji != null)
                      Text(
                        widget.emoji!,
                        style: const TextStyle(fontSize: 72),
                      ),
                    const SizedBox(height: 24),
                    CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation(widget.themeColor),
                      value: loadingProgress > 0 ? loadingProgress : null,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Loading ${widget.gameTitle}...',
                      style: TextStyle(
                        fontSize: 18,
                        color: widget.themeColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (loadingProgress > 0)
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text(
                          '${(loadingProgress * 100).toInt()}%',
                          style: TextStyle(
                            fontSize: 14,
                            color: widget.themeColor.withOpacity(0.7),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  void _toggleFullscreen() {
    // TODO: Implement fullscreen toggle
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Fullscreen mode coming soon!'),
        duration: Duration(seconds: 2),
      ),
    );
  }
}
