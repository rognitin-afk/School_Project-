import { Link } from 'react-router-dom'
import { Topbar } from '../components/Topbar'

export function MDNFAboutPage() {
  return (
    <div className="app">
      <Topbar />
      <div className="study-page">
        <div className="study-page__header">
          <Link to="/" className="study-page__back">
            ← Back to map
          </Link>
        </div>

        <div className="study-page__content">
          <h1 className="study-page__title">About MDNF</h1>

          <section className="study-page__card">
            <h2>Introduction</h2>
            <p>
              MDNF was formally established on 14 June 2012. It is an umbrella organization of 145 Dalit
              NGOs/CSOs from all 21 districts of Terai/Madhesh to raise collective voices of Madheshi Dalit
              community to ensure their right, dignity and opportunity through policy influence, networking/
              alliance building and empowerment. Upholding human right culture and democratic norms/values are
              the basic principles of MDNF. Registered with District Administration Office (DAO) in
              Kathmandu and affiliated with Social Welfare Council (SWC), MDNF is an independent and autonomous
              organization governed by a central executive committee of nine members for three-year term
              elected through a democratic process.
            </p>
            <p>
              MDNF provides technical supports to its member organizations (MOS) and other Dalit related
              NGOs in capacity building, coordination, empowerment, alliance building and resource mobilization
              etc. MDNF supports its MOS to promote right based approach (RBA), access to justice, quality
              services, coordination, fosters collaboration with government and international organizations
              including development partners. MDNF jointly with its MOS and wider CSOs/NGOs/networks advocates to
              protect and promote human rights in line with international human rights laws and practices.
              It supports the MOs and wider CSOs to follow RBA through participatory planning, inclusion,
              transparency and accountability to deliver quality services to right holders.
            </p>

            <h2>Vision</h2>
            <p>Discrimination free Nepali society where all people live with equal respect and dignity.</p>

            <h2>Mission</h2>
            <p>
              Contribute to eliminate cast-based discrimination and untouchability through capacity building and
              empowerment of Dalit organizations by networking and collaboration with likeminded wider organizations.
            </p>

            <h2>Goal</h2>
            <p>
              By 2030, MDNF will contribute to bring socio-economic transformation and increase political representation
              of Madheshi Dalits at all of State structures through empowering MOS to advocate for justice, inclusive
              and equality guaranteed by Constitution.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

