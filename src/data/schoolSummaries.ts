export interface SchoolSummary {
  slug: string
  title: string
  paragraphs: string[]
}

export const SCHOOL_SUMMARIES: SchoolSummary[] = [
  {
    slug: 'shre-ram-naresh-laxman-secondary-school-hajminiya',
    title: 'Empowering the Future: Improving School Attendance in Rautahat District',
    paragraphs: [
      'The Madhesi Dalit NGO Federation (MDNF), in collaboration with Latter-Day-Saint Charities (LDSC), recently concluded a transformative project titled “The Improving School Attendance in Rautahat District for Economically Disadvantaged Project (WE24NPL0010)”. This initiative focused on enhancing the educational landscape for students in the Madhesh Province of Nepal, specifically at Shre Ram Naresh Laxman Secondary School in Rajdevi Municipality. By addressing the economic and resource-related barriers that often lead to high dropout rates, the project sought to foster a supportive learning environment through the provision of essential supplies and infrastructure.',
      'The core mission of the project was to boost academic performance and student well-being by improving hygiene standards and learning facilities. Key objectives included increasing literacy rates and improving academic performance through better resources, enhancing student health by providing hygiene and health kits, reducing dropout rates by removing the economic burdens associated with schooling, and strengthening school infrastructure to allow for more effective teaching.',
      'Spanning from October 2024 to February 2025, the project followed a meticulous implementation plan. MDNF worked closely with the Social Welfare Council (SWC) and local municipal authorities to ensure all activities were legally authorized and community-supported. A highly transparent procurement process was established, inviting quotations from 14 different firms to ensure the highest quality and best value for the educational materials provided.',
      'The project achieved significant milestones through two major distribution events. On 25 November 2024, a ceremony was held to provide students and the school with essential materials. This included 786 school bags and 3,500 notebooks for students across all grades, 786 hygiene kits containing toothbrushes, toothpaste, and other personal care items, 127 specialised health kits for girls in grades 7–10 to support their unique needs, and 100 sets of benches and desks so students no longer had to study in uncomfortable conditions.',
      'The second major phase was the Bicycle Distribution Program on 8 January 2025. After conducting door-to-door surveys to identify the most vulnerable students, MDNF distributed 81 bicycles (45 for girls, 35 for boys, and 1 for a student with a disability). These bicycles are life-changing for students who previously faced long, difficult commutes, directly encouraging regular attendance.',
      'The project was not without its hurdles. During the planning phase, initial data provided by the school omitted two full classes, undercounting the student body by over 120 children. MDNF successfully adjusted the budget and logistics to ensure that all 786 students received support, leaving no child behind. Additionally, the team successfully navigated local political pressures during the bicycle selection process by involving higher authorities and the police to maintain a fair, merit-based distribution for the truly deserving.',
      'The success of this initiative highlighted the power of effective collaboration between international partners, local NGOs, and municipal governments. Key takeaways included the importance of transparent selection processes and the significant role of media in amplifying the programme’s impact across the region. Moving forward, MDNF recommends expanding these efforts to include online learning tools and ongoing monitoring mechanisms to track the long-term progress of these students.',
      'By providing more than just material goods, this project has planted the seeds of empowerment in Rautahat. Education is the “light of the lamp” that dispels the darkness of ignorance, and through the combined efforts of MDNF and LDSC, hundreds of students now have a brighter path forward. We remain committed to building a future where every child, regardless of their economic background, has the opportunity to succeed.',
    ],
  },
]

export function getSchoolSummaryBySlug(slug: string) {
  return SCHOOL_SUMMARIES.find((s) => s.slug === slug)
}

