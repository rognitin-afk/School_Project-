import { useEffect, useState } from 'react'

const RSS_URL = 'https://ekantipur.com/rss'

export interface KantipurNewsItem {
  title: string
  link: string
  pubDate?: string
}

function parseRssItems(xmlText: string, maxItems: number): KantipurNewsItem[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const parseError = doc.querySelector('parsererror')
  if (parseError) return []

  const items: KantipurNewsItem[] = []
  const nodes = doc.querySelectorAll('rss > channel > item, channel > item')
  nodes.forEach((el) => {
    if (items.length >= maxItems) return
    const title = el.querySelector('title')?.textContent?.trim() ?? ''
    let link = el.querySelector('link')?.textContent?.trim() ?? ''
    const linkEl = el.querySelector('link')
    if (!link && linkEl) {
      link = linkEl.getAttribute('href')?.trim() ?? ''
    }
    const pubDate = el.querySelector('pubDate')?.textContent?.trim()
    if (title && link) {
      items.push({ title, link, pubDate })
    }
  })
  return items
}

export function KantipurNewsSection() {
  const [items, setItems] = useState<KantipurNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Feed request failed')
        return res.text()
      })
      .then((xml) => {
        if (cancelled) return
        const parsed = parseRssItems(xml, 12)
        if (parsed.length === 0) {
          setErr('Could not read today’s headlines from the feed.')
        } else {
          setItems(parsed)
          setErr(null)
        }
      })
      .catch(() => {
        if (!cancelled) setErr('Could not load Kantipur news. Check your connection or try again later.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="kantipur-news" aria-labelledby="kantipur-news-heading">
      <div className="kantipur-news-inner">
        <header className="kantipur-news-header">
          <h2 id="kantipur-news-heading">Today’s headlines (Kantipur / Ekantipur)</h2>
          <p className="kantipur-news-meta">
            Latest items from the public RSS feed — updated when you open this page.
          </p>
        </header>

        {loading && <p className="kantipur-news-status">Loading today’s news…</p>}
        {!loading && err && (
          <p className="kantipur-news-status kantipur-news-status--error">{err}</p>
        )}
        {!loading && items.length > 0 && (
          <ul className="kantipur-news-list">
            {items.map((item, i) => (
              <li key={`${item.link}-${i}`} className="kantipur-news-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                {item.pubDate && (
                  <span className="kantipur-news-date">{item.pubDate}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="kantipur-news-footer">
          <a href="https://ekantipur.com" target="_blank" rel="noopener noreferrer">
            Open Kantipur (Ekantipur) website →
          </a>
        </p>
      </div>
    </section>
  )
}
