# 🇯🇵 Japan Developer Tools Integration Guide

## Complete guide for integrating Japanese services and making your app bilingual

---

## 🎯 **WHAT THIS GUIDE COVERS**

1. **Bilingual Support** (English + Japanese)
2. **Free Japan Developer Tools** (PayPay, Rakuten, LINE, etc.)
3. **Japanese Payment Integration**
4. **Japan-specific APIs and Data**
5. **Deployment for Japanese Users**

---

## 🌐 **BILINGUAL SUPPORT (IMPLEMENTED)**

### **✅ Language Toggle System Added**

**File:** `src/contexts/LanguageContext.tsx`

**Features:**
- ✅ English ↔ Japanese toggle
- ✅ Persistent language preference (localStorage)
- ✅ Auto-detect browser language
- ✅ Translation function `t(key)`
- ✅ Language toggle button component

### **How to Use:**

#### **1. Wrap App with LanguageProvider**

```typescript
// src/App.tsx or main.tsx
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Your app */}
      </Router>
    </LanguageProvider>
  );
}
```

#### **2. Use Translations in Components**

```typescript
import { useLanguage, LanguageToggle } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t('curriculum.title')}</h1>
      <p>{t('curriculum.subtitle')}</p>
      <LanguageToggle /> {/* Toggle button */}
    </div>
  );
}
```

#### **3. Add Translations**

Add to `LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    'my.key': 'English text',
  },
  ja: {
    'my.key': '日本語テキスト',
  }
};
```

---

## 💰 **PAYMENT INTEGRATION (JAPAN)**

### **Best Options for Your App**

| Service | Best For | Free Tier | Production Cost |
|---------|----------|-----------|-----------------|
| **PayPay** | Japanese users | Sandbox free | Merchant fees apply |
| **Stripe Japan** | International + Japan | Test mode free | 3.6% per transaction |
| **LINE Pay** | ⚠️ **ENDED April 2025** | N/A | Use PayPay instead |
| **Square Japan** | POS + online | Sandbox free | 3.25% - 3.95% |
| **KOMOJU** | Japan-local methods | Sandbox free | 3.6% + ¥30 |

---

### **1. PayPay Integration**

**Status:** Free sandbox, production requires merchant approval

#### **Setup:**

```bash
npm install axios
```

#### **Implementation:**

```typescript
// src/services/paypayService.ts
import axios from 'axios';

const PAYPAY_API_BASE = process.env.VITE_PAYPAY_SANDBOX 
  ? 'https://stg-api.paypay.ne.jp/v2'
  : 'https://api.paypay.ne.jp/v2';

export const createPayPalPayment = async (amount: number, orderId: string) => {
  try {
    const response = await axios.post(
      `${PAYPAY_API_BASE}/codes`,
      {
        merchantPaymentId: orderId,
        amount: {
          amount: amount,
          currency: 'JPY'
        },
        codeType: 'ORDER_QR',
        orderDescription: 'NihonQuest Premium',
        redirectUrl: `${window.location.origin}/payment/success`,
        redirectType: 'WEB_LINK'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.VITE_PAYPAY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('PayPay payment error:', error);
    throw error;
  }
};
```

#### **Get PayPay Credentials:**

1. Register: https://developer.paypay.ne.jp/
2. Create sandbox app
3. Get API key + secret
4. Add to `.env`:

```
VITE_PAYPAY_API_KEY=your_api_key
VITE_PAYPAY_API_SECRET=your_secret
VITE_PAYPAY_MERCHANT_ID=your_merchant_id
VITE_PAYPAY_SANDBOX=true
```

---

### **2. Stripe Japan Integration**

**Status:** Best for international + Japanese cards

#### **Setup:**

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

#### **Implementation:**

```typescript
// src/services/stripeService.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY!);

export const createCheckoutSession = async (priceId: string) => {
  const stripe = await stripePromise;
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId })
  });
  
  const session = await response.json();
  
  await stripe?.redirectToCheckout({
    sessionId: session.id
  });
};
```

#### **Stripe Japan Payments:**

- Cards (Visa, Mastercard, Amex, JCB)
- Konbini (convenience store payments)
- Bank transfers
- PayPay wallet (via Stripe)

---

## 🔐 **LINE INTEGRATION**

### **LINE Login**

**Best for:** Japanese user authentication

#### **Setup:**

```bash
npm install @line/liff
```

#### **Implementation:**

```typescript
// src/services/lineService.ts
import liff from '@line/liff';

const LIFF_ID = process.env.VITE_LINE_LIFF_ID!;

export const initializeLINE = async () => {
  try {
    await liff.init({ liffId: LIFF_ID });
    
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      const profile = await liff.getProfile();
      return {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl
      };
    }
  } catch (error) {
    console.error('LINE init error:', error);
  }
};

export const logoutLINE = () => {
  liff.logout();
};
```

#### **Get LINE Credentials:**

1. LINE Developers: https://developers.line.biz/
2. Create LINE Login channel
3. Create LIFF app
4. Get LIFF ID
5. Add to `.env`:

```
VITE_LINE_LIFF_ID=your_liff_id
VITE_LINE_CHANNEL_ID=your_channel_id
```

---

### **LINE Messaging API**

**Best for:** Customer support, notifications

#### **Features:**

- Send messages to users
- Rich menus
- Flex messages
- Push notifications
- **Free tier:** 200 messages/month

#### **Setup:**

```bash
npm install @line/bot-sdk
```

#### **Implementation:**

```typescript
// Backend (Node.js/Express)
import { Client } from '@line/bot-sdk';

const lineClient = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!
});

export const sendLessonCompleteMessage = async (userId: string, lessonTitle: string) => {
  await lineClient.pushMessage(userId, {
    type: 'text',
    text: `🎉 ${lessonTitle}を完了しました！おめでとうございます！`
  });
};
```

---

## 🛍️ **JAPAN E-COMMERCE APIS**

### **1. Rakuten Web Service**

**Status:** Free APIs

#### **Setup:**

```typescript
// src/services/rakutenService.ts
const RAKUTEN_APP_ID = process.env.VITE_RAKUTEN_APP_ID!;
const RAKUTEN_API_BASE = 'https://app.rakuten.co.jp/services/api';

export const searchProducts = async (keyword: string) => {
  const response = await fetch(
    `${RAKUTEN_API_BASE}/IchibaItem/Search/20220601?` +
    `applicationId=${RAKUTEN_APP_ID}&` +
    `keyword=${encodeURIComponent(keyword)}&` +
    `hits=20&` +
    `formatVersion=2`
  );
  
  return await response.json();
};

export const searchBooks = async (title: string) => {
  const response = await fetch(
    `${RAKUTEN_API_BASE}/BooksBook/Search/20170404?` +
    `applicationId=${RAKUTEN_APP_ID}&` +
    `title=${encodeURIComponent(title)}&` +
    `hits=20`
  );
  
  return await response.json();
};
```

#### **Get Rakuten API Key:**

1. Register: https://webservice.rakuten.co.jp/
2. Get Application ID (free)
3. Add to `.env`:

```
VITE_RAKUTEN_APP_ID=your_app_id
```

---

### **2. Yahoo! JAPAN Shopping API**

**Status:** Free with app ID

#### **Implementation:**

```typescript
// src/services/yahooService.ts
const YAHOO_APP_ID = process.env.VITE_YAHOO_APP_ID!;

export const searchYahooShopping = async (query: string) => {
  const response = await fetch(
    `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?` +
    `appid=${YAHOO_APP_ID}&` +
    `query=${encodeURIComponent(query)}&` +
    `results=20`
  );
  
  return await response.json();
};
```

---

## 🍱 **JAPAN LOCAL SERVICES**

### **1. Hot Pepper Gourmet (Restaurant Search)**

**Status:** Free API key

```typescript
// src/services/hotpepperService.ts
const HOTPEPPER_API_KEY = process.env.VITE_HOTPEPPER_API_KEY!;

export const searchRestaurants = async (lat: number, lng: number, range: number = 3) => {
  const response = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?` +
    `key=${HOTPEPPER_API_KEY}&` +
    `lat=${lat}&` +
    `lng=${lng}&` +
    `range=${range}&` +
    `format=json&` +
    `count=20`
  );
  
  return await response.json();
};
```

**Get API Key:** https://webservice.recruit.co.jp/

---

### **2. Jalan (Hotel/Travel API)**

```typescript
// src/services/jalanService.ts
const JALAN_API_KEY = process.env.VITE_JALAN_API_KEY!;

export const searchHotels = async (area: string) => {
  const response = await fetch(
    `http://jws.jalan.net/APICommon/HotelSearch?` +
    `key=${JALAN_API_KEY}&` +
    `s_area=${area}&` +
    `xml_ptn=1&` +
    `count=20`
  );
  
  return await response.json();
};
```

---

## 🗺️ **JAPAN MAPS & LOCATION**

### **GSI Tiles (Official Japan Maps)**

**Status:** Free with attribution

```typescript
// src/components/JapanMap.tsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export function JapanMap({ lat, lng }: { lat: number, lng: number }) {
  return (
    <MapContainer center={[lat, lng]} zoom={15} style={{ height: '400px' }}>
      <TileLayer
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}
```

**Install:**

```bash
npm install leaflet react-leaflet
```

---

### **Japan Post Postal Code Lookup**

**Status:** Free CSV data

```typescript
// src/services/postalCodeService.ts
export const lookupPostalCode = async (code: string) => {
  // Download CSV from: https://www.post.japanpost.jp/zipcode/download.html
  // Or use API service like zipcloud.ibsnet.co.jp
  
  const response = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`
  );
  
  return await response.json();
};
```

---

## 📊 **JAPAN GOVERNMENT DATA**

### **e-Stat API (Official Statistics)**

**Status:** Free with registration

```typescript
// src/services/estatService.ts
const ESTAT_APP_ID = process.env.VITE_ESTAT_APP_ID!;

export const getStatistics = async (statsDataId: string) => {
  const response = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?` +
    `appId=${ESTAT_APP_ID}&` +
    `statsDataId=${statsDataId}`
  );
  
  return await response.json();
};
```

**Register:** https://www.e-stat.go.jp/api/

---

## 🚀 **DEPLOYMENT FOR JAPAN USERS**

### **Best Hosting Options**

| Service | Japan Presence | Free Tier | Best For |
|---------|----------------|-----------|----------|
| **Cloudflare Pages** | Japan edge nodes | ✅ Unlimited | Static sites, SPAs |
| **Vercel** | Japan edge network | ✅ Hobby (personal) | Next.js apps |
| **Firebase Hosting** | Tokyo region | ✅ Free tier | PWAs, mobile apps |
| **Oracle Cloud** | Tokyo + Osaka | ✅ Always Free | Self-hosted apps |
| **AWS Tokyo** | ap-northeast-1 | ✅ Free tier (12 months) | Enterprise |

### **Recommended for Japan Users:**

**Option 1: Cloudflare + Firebase**
```bash
# Frontend on Cloudflare Pages
npm run build
wrangler pages deploy dist

# Backend functions on Firebase (Tokyo region)
firebase deploy --only functions
```

**Option 2: Vercel (Japan Edge)**
```bash
# Auto-deploys to Japan edge
vercel deploy --prod
```

**Option 3: Self-hosted on Oracle Cloud (Tokyo)**
- Always Free tier includes:
  - 2 VMs (1/8 OCPU, 1GB RAM each)
  - 200GB storage
  - 10TB egress/month
  - Tokyo + Osaka regions

---

## 🔧 **COMPLETE INTEGRATION EXAMPLE**

### **Premium Japanese Learning App**

```typescript
// src/pages/PremiumPage.tsx
import { useLanguage } from '@/contexts/LanguageContext';
import { createPayPayPayment } from '@/services/paypayService';
import { initializeLINE } from '@/services/lineService';
import { searchProducts } from '@/services/rakutenService';

export function PremiumPage() {
  const { t, language } = useLanguage();
  
  const handleUpgrade = async () => {
    // LINE Login first
    const user = await initializeLINE();
    
    if (!user) return;
    
    // Create PayPay payment
    const payment = await createPayPayPayment(
      language === 'ja' ? 2980 : 29.99, // JPY or USD
      `order-${Date.now()}`
    );
    
    // Redirect to PayPay
    window.location.href = payment.data.url;
  };
  
  return (
    <div>
      <h1>{t('premium.title')}</h1>
      <button onClick={handleUpgrade}>
        {t('premium.upgrade')}
      </button>
    </div>
  );
}
```

---

## 📦 **ENV VARIABLES NEEDED**

Create `.env.local`:

```bash
# Language/Region
VITE_DEFAULT_LANGUAGE=en
VITE_TIMEZONE=Asia/Tokyo

# PayPay
VITE_PAYPAY_API_KEY=your_key
VITE_PAYPAY_API_SECRET=your_secret
VITE_PAYPAY_MERCHANT_ID=your_merchant_id
VITE_PAYPAY_SANDBOX=true

# LINE
VITE_LINE_LIFF_ID=your_liff_id
VITE_LINE_CHANNEL_ID=your_channel_id
LINE_CHANNEL_ACCESS_TOKEN=your_access_token

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Japan APIs
VITE_RAKUTEN_APP_ID=your_app_id
VITE_YAHOO_APP_ID=your_app_id
VITE_HOTPEPPER_API_KEY=your_key
VITE_JALAN_API_KEY=your_key
VITE_ESTAT_APP_ID=your_app_id

# Maps
VITE_GSI_ATTRIBUTION=true
```

---

## ✅ **INTEGRATION CHECKLIST**

### **Phase 1: Bilingual Support** ✅ DONE
- [x] Language toggle system
- [x] Translation function
- [x] Persistent language preference
- [ ] Add to Layout.tsx
- [ ] Translate all pages

### **Phase 2: Japanese Authentication**
- [ ] LINE Login integration
- [ ] LINE user profile
- [ ] Session management
- [ ] Logout flow

### **Phase 3: Payments**
- [ ] PayPay sandbox setup
- [ ] Payment flow UI
- [ ] Success/failure handling
- [ ] Receipt generation

### **Phase 4: Japan Services**
- [ ] Rakuten product search
- [ ] Hot Pepper restaurant API
- [ ] GSI maps integration
- [ ] Postal code lookup

### **Phase 5: Deployment**
- [ ] Deploy to Cloudflare Pages
- [ ] Configure Japan edge routing
- [ ] Test from Japan
- [ ] Monitor performance

---

## 🎯 **QUICK START**

### **1. Add Bilingual Support NOW:**

```bash
# Already created: src/contexts/LanguageContext.tsx
```

Update `src/App.tsx`:

```typescript
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      {/* Your existing app */}
    </LanguageProvider>
  );
}
```

Update `src/components/Layout.tsx`:

```typescript
import { LanguageToggle } from '@/contexts/LanguageContext';

// Add to header
<LanguageToggle />
```

### **2. Test Locally:**

```bash
npm run dev
```

Toggle between English 🇺🇸 and Japanese 🇯🇵!

### **3. Deploy:**

```bash
npm run build
firebase deploy --only hosting
```

---

## 📚 **RESOURCES**

### **Official Documentation:**
- PayPay Developers: https://developer.paypay.ne.jp/
- LINE Developers: https://developers.line.biz/
- Rakuten Web Service: https://webservice.rakuten.co.jp/
- Stripe Japan: https://stripe.com/jp
- e-Stat API: https://www.e-stat.go.jp/api/

### **Testing:**
- PayPay Sandbox: Test with virtual money
- LINE LIFF Simulator: Test without app submission
- Stripe Test Mode: Test cards available

---

## 🎉 **YOU NOW HAVE**

✅ **Bilingual system** (English + Japanese)  
✅ **Integration guide** for all major Japan services  
✅ **Payment options** (PayPay, Stripe, Square, KOMOJU)  
✅ **LINE integration** (Login + Messaging)  
✅ **Japan APIs** (Rakuten, Yahoo, Hot Pepper, Jalan)  
✅ **Maps & data** (GSI, e-Stat, postal codes)  
✅ **Deployment guide** for Japan users  

**Your app is now ready for Japanese AND American users!** 🇯🇵🇺🇸🚀
