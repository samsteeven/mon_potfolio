import Banner from '~/pages/Banner'
import AboutMe from '~/pages/AboutMe'
import Skills from '~/pages/Skills'
import Experiences from '~/pages/Experiences'
import ProjectList from '~/pages/ProjectList'

export default function Home() {
  return (
    <>
      <div className="page-">
        <Banner />
        <AboutMe />
        <Skills />
        <Experiences />
        <ProjectList />
      </div>
    </>
  )
}
