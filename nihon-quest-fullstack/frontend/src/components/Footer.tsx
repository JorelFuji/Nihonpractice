import { Link } from 'react-router-dom'
import { Shield, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🌸</span> 日本Quest
            </h3>
            <p className="text-gray-300 mb-4">
              Interactive Japanese learning platform for all skill levels
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Service-Disabled Veteran-Owned Small Business (SDVOSB)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">All Features</Link></li>
              <li><Link to="/kanji" className="hover:text-white transition-colors">Kanji Learning</Link></li>
              <li><Link to="/kids-mode" className="hover:text-white transition-colors">Kids Mode</Link></li>
              <li><Link to="/tutor" className="hover:text-white transition-colors">AI Tutor</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:melvin.j.spiller@gmail.com" className="hover:text-white transition-colors break-all">
                  melvin.j.spiller@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  DUNS: 132737694<br />
                  UEI: MUGPMK51DFB4<br />
                  NAICS: 541512
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              © {currentYear} <span className="font-semibold text-white">Osaka Oaks LLC</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              This application is proprietary software owned and operated by Osaka Oaks LLC, a Service-Disabled Veteran-Owned Small Business (SDVOSB).
            </p>
            <p className="text-xs text-gray-500">
              Unauthorized reproduction, distribution, or use of this software is strictly prohibited.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-4">
              <span>🇺🇸 Veteran-Owned</span>
              <span>•</span>
              <span>🔒 Secure by Design</span>
              <span>•</span>
              <span>Made with ❤️ for Japanese Learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
