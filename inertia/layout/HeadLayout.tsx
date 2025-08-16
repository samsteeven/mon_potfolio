import {Head} from "@inertiajs/react";

interface headProps{
  title: string
  description: string
}
export const HeadLayout = ({title, description} : headProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  )
}
