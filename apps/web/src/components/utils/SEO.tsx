import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function SEO(props: SEOProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      {props.children}
    </>
  );
}
