import type { Metadata, Viewport } from "next"
import "swagger-ui-react/swagger-ui.css"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://api.scode.zyther.dev"
const SITE_NAME = "SCode API"
const SITE_DESCRIPTION =
  "Public HTTP API for encoding and decoding messages with classic ciphers — Enigma, Morse, Polybius, Vigenère, and more. Free, stateless, no authentication required."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  authors: [{ name: "Zyther Dev", url: "https://zyther.dev" }],
  creator: "Zyther Dev",
  publisher: "Zyther Dev",
  category: "developer tools",
  keywords: [
    "cipher API",
    "encryption API",
    "enigma API",
    "morse code API",
    "polybius API",
    "vigenere API",
    "classic ciphers",
    "cryptography",
    "encode API",
    "decode API",
    "scode",
    "zyther",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@zytherdev",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico"
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebAPI",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  documentation: `${SITE_URL}/docs`,
  provider: {
    "@type": "Organization",
    name: "Zyther Dev",
    url: "https://zyther.dev",
  },
  termsOfService: `${SITE_URL}/terms`,
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-gray-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  )
}