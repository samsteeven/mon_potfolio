import Banner from '~/pages/Banner'
import AboutMe from '~/pages/AboutMe'
import Skills from '~/pages/Skills'
import Experiences from '~/pages/Experiences'
import ProjectList from '~/pages/ProjectList'
import {Head} from "@inertiajs/react";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    const originalTitle = document.title;
    function handleVisibilityChange() {
      if (document.hidden) {
        document.title = "Come Back!!";
      } else {
        document.title = originalTitle;
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
    <Head title='home page' />
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
