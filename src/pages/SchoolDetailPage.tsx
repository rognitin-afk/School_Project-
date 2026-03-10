import { useParams, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { getPinBySlug } from '../data/mapPins'
import { getSchoolSummaryBySlug } from '../data/schoolSummaries'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function SchoolDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const reportRef = useRef<HTMLDivElement>(null)
  const mindmapFrameRef = useRef<HTMLDivElement>(null)
  const [mindmapZoom, setMindmapZoom] = useState(100)
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const isPanningRef = useRef(false)
  const panStartRef = useRef<{
    x: number
    y: number
    scrollLeft: number
    scrollTop: number
  } | null>(null)

  const school = slug ? getPinBySlug(slug) : undefined
  const summary = slug ? getSchoolSummaryBySlug(slug) : undefined

  const handleDownloadPdf = async () => {
    const el = reportRef.current
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const ratio = canvas.height / canvas.width
      let w = pageW
      let h = pageW * ratio
      if (h > pageH) {
        w = pageH / ratio
        h = pageH
      }
      pdf.addImage(imgData, 'PNG', 0, 0, w, h)
      pdf.save(`${school?.label ?? 'school'}-report.pdf`)
    } catch (e) {
      console.error('PDF export failed', e)
    }
  }

  const handleMindmapZoomChange = (delta: number) => {
    setMindmapZoom((current) => {
      const next = Math.max(25, Math.min(200, current + delta))
      return next
    })
  }

  const handleMindmapMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const frame = mindmapFrameRef.current
    if (!frame) return
    isPanningRef.current = true
    frame.classList.add('school-report-mindmap-frame--panning')
    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: frame.scrollLeft,
      scrollTop: frame.scrollTop,
    }
  }

  const handleMindmapMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isPanningRef.current || !panStartRef.current) return
    event.preventDefault()
    const frame = mindmapFrameRef.current
    if (!frame) return
    const dx = event.clientX - panStartRef.current.x
    const dy = event.clientY - panStartRef.current.y
    frame.scrollLeft = panStartRef.current.scrollLeft - dx
    frame.scrollTop = panStartRef.current.scrollTop - dy
  }

  const endMindmapPan = () => {
    const frame = mindmapFrameRef.current
    isPanningRef.current = false
    panStartRef.current = null
    if (frame) {
      frame.classList.remove('school-report-mindmap-frame--panning')
    }
  }

  if (!slug || !school) {
    return (
      <div className="school-detail school-detail--error">
        <div className="school-detail-card">
          <p className="school-detail-error-text">School not found.</p>
          <Link to="/" className="school-detail-back">← Back to map</Link>
        </div>
      </div>
    )
  }

  const heroImages: string[] = []
  if (school.image) {
    heroImages.push(school.image)
  }
  if (slug === 'shre-ram-naresh-laxman-secondary-school-hajminiya') {
    // Additional images for Ram Naresh school
    heroImages.push('/School image/RamNareshSchool/DSC_1087.JPG')
    heroImages.push('/School image/RamNareshSchool/DSC_1084.JPG')
    heroImages.push('/School image/RamNareshSchool/DSC_0867.JPG')
  }

  const currentHeroImage = heroImages[heroImageIndex] ?? heroImages[0] ?? null

  const handleHeroPrev = () => {
    if (heroImages.length <= 1) return
    setHeroImageIndex((idx) => (idx - 1 + heroImages.length) % heroImages.length)
  }

  const handleHeroNext = () => {
    if (heroImages.length <= 1) return
    setHeroImageIndex((idx) => (idx + 1) % heroImages.length)
  }

  return (
    <div className="school-detail">
      <div className="school-detail-inner">
        <header className="school-detail-header">
          <Link to="/" className="school-detail-back" aria-label="Back to map">← Back to map</Link>
          <h1 className="school-detail-title">{school.label}</h1>
          <button type="button" className="school-detail-download-pdf" onClick={handleDownloadPdf}>
            Download report (PDF)
          </button>
        </header>

        <div ref={reportRef} className="school-report-content">
          <div className="school-report-hero">
            <h2 className="school-report-heading">School progress report</h2>
            <p className="school-report-meta">{school.label}{school.district ? ` · ${school.district}` : ''}</p>
          </div>

          {currentHeroImage && (
            <figure className={heroImages.length > 1 ? 'school-report-figure school-report-figure--slider' : 'school-report-figure'}>
              <img src={currentHeroImage} alt={school.label} className="school-report-img" />
              {heroImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="school-report-slider-btn school-report-slider-btn--prev"
                    onClick={handleHeroPrev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="school-report-slider-btn school-report-slider-btn--next"
                    onClick={handleHeroNext}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="school-report-slider-dots" aria-hidden="true">
                    {heroImages.map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx === heroImageIndex
                            ? 'school-report-slider-dot school-report-slider-dot--active'
                            : 'school-report-slider-dot'
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </figure>
          )}

          {summary && (
            <section className="school-report-body">
              <h3 className="school-report-summary-title">{summary.title}</h3>
              {summary.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </section>
          )}

          {/* Mind map section – large and readable */}
          {slug === 'shre-ram-naresh-laxman-secondary-school-hajminiya' && (
            <section className="school-report-mindmap" aria-label="Mind map">
              <h3 className="school-report-mindmap-title">Mind map overview</h3>
              <p className="school-report-mindmap-text">
                This mind map summarises the key areas of support and progress for this school. Use the button
                below to open the full-size version and zoom into each node.
              </p>
              <div className="school-report-mindmap-controls">
                <button
                  type="button"
                  className="school-report-mindmap-zoom-btn"
                  onClick={() => handleMindmapZoomChange(-25)}
                >
                  −
                </button>
                <span className="school-report-mindmap-zoom-label">{mindmapZoom}%</span>
                <button
                  type="button"
                  className="school-report-mindmap-zoom-btn"
                  onClick={() => handleMindmapZoomChange(25)}
                >
                  +
                </button>
              </div>
              <div
                ref={mindmapFrameRef}
                className="school-report-mindmap-frame"
                onMouseDown={handleMindmapMouseDown}
                onMouseMove={handleMindmapMouseMove}
                onMouseLeave={endMindmapPan}
                onMouseUp={endMindmapPan}
              >
                <img
                  src="/mindmap%20image/NotebookLM%20Mind%20Mapf.png"
                  alt={`${school.label} mind map`}
                  className="school-report-mindmap-img"
                  style={{ transform: `scale(${mindmapZoom / 100})`, transformOrigin: 'top left' }}
                />
              </div>
              <a
                href="/mindmap%20image/NotebookLM%20Mind%20Mapf.png"
                target="_blank"
                rel="noopener noreferrer"
                className="school-report-mindmap-link"
              >
                Open full-size mind map
              </a>
            </section>
          )}

          {/* Add more images here later – use school-report-gallery and school-report-gallery-item */}
          <section className="school-report-gallery" aria-label="Gallery">
            {/* Example for later: <img src="..." alt="..." className="school-report-gallery-item" /> */}
          </section>
        </div>
      </div>
    </div>
  )
}
