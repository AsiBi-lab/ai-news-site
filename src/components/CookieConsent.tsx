'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type ConsentState = 'pending' | 'accepted' | 'declined' | 'custom'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = 'aideck-cookie-consent'
const PREFERENCES_KEY = 'aideck-cookie-preferences'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (state: ConsentState, prefs?: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, state)
    if (prefs) {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs))
    }
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true }
    setPreferences(allAccepted)
    saveConsent('accepted', allAccepted)
  }

  const handleDecline = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false }
    setPreferences(essentialOnly)
    saveConsent('declined', essentialOnly)
  }

  const handleSavePreferences = () => {
    saveConsent('custom', preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Overlay */}
      {showPreferences && (
        <div
          className="fixed inset-0 bg-black/50 z-[998]"
          onClick={() => setShowPreferences(false)}
        />
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[1000] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg">
          <Card className="shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Cookie Preferences</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Customize which cookies you allow. Essential cookies cannot be disabled
                as they are required for the site to function.
              </p>

              <div className="space-y-4">
                {/* Essential */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Essential Cookies</p>
                    <p className="text-sm text-muted-foreground">
                      Required for the website to function (theme, consent)
                    </p>
                  </div>
                  <div className="shrink-0">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors use the site (Vercel Analytics)
                    </p>
                  </div>
                  <div className="shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Marketing Cookies</p>
                    <p className="text-sm text-muted-foreground">
                      Used for targeted advertising (currently not in use)
                    </p>
                  </div>
                  <div className="shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={handleDecline} className="flex-1">
                  Reject All
                </Button>
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cookie Banner */}
      {!showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Cookie className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">We value your privacy</p>
                      <p className="text-sm text-muted-foreground">
                        We use cookies to improve your experience and analyze site traffic.
                        No personal data is sold.
                        <a href="/privacy" className="text-primary hover:underline ml-1">Learn more</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreferences(true)}
                      className="gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Customize
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDecline}
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
